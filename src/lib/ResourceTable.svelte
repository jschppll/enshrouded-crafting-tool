<script lang="ts">
    import type {CompoundResource} from "../resources/ResourceTypes";
    import Utils from "../resources/utils"
    import { SvelteSet } from 'svelte/reactivity';

    // Types //
    type IngredientMapType = Map<string, {
        amount: number,
        location: string
    }>;


    // Props //
    let { resource, amount = $bindable() }: { resource: CompoundResource | undefined, amount: number } = $props();


    // State //
    let expandedIngredients = $state<SvelteSet<string>>(new SvelteSet());

    $effect(() => {
       if (resource) {
           expandedIngredients.clear();
           amount = 1;
       }
    });

    let ingredientMap = $derived.by(() => {
        const map: IngredientMapType = new Map();

        if (resource) {
            for (const item of resource.inputs) {
                const calculatedAmount = item.quantity * calculateMultiplierForRequestedAmount(resource.id, amount);

                if (expandedIngredients.has(item.id))
                {
                    Expand(item.id, calculatedAmount, map);
                    continue;
                }

                addToIngredientMap(item.id, calculatedAmount, map);
            }
        }

        return map;
    });

    // Functions //
    const Expand = (id: string, amount: number, outMap: IngredientMapType) => {
        const expandedResource = Utils.getCompoundResourceFromId(id);
        if (expandedResource)
        {
            // Grab all the inputs for the resource we are expanding
            for (const input of expandedResource.inputs)
            {
                const calculatedAmount = input.quantity * calculateMultiplierForRequestedAmount(id, amount);

                if (expandedIngredients.has(input.id))
                {
                    Expand(input.id, calculatedAmount, outMap);
                }
                else
                {
                    addToIngredientMap(input.id, calculatedAmount, outMap);
                }
            }
        }
        else
        {
            addToIngredientMap(id, amount, outMap);
        }
    }

    const addToIngredientMap = (id: string, amount: number, outMap: IngredientMapType) => {
        // If the map already has this ingredient in it then add our expanded
        // quantity to the existing quantity
        if (outMap.has(id))
        {
            const existingResource = outMap.get(id)!;
            existingResource.amount += amount;
            existingResource.location = getLocationForResourceId(id);

            outMap.set(id, existingResource);
        }
        else
        {
            outMap.set(id, { amount, location : getLocationForResourceId(id) });
        }
    }

    const AddToExpandedIngredients = (ingredient : string) => {
        expandedIngredients.add(ingredient);
    };

    const RemoveFromExpandedIngredients = (ingredient : string) => {
        expandedIngredients.delete(ingredient);
    }

    const calculateMultiplierForRequestedAmount = (id : string, amount : number) => {
        const compoundResource = Utils.getCompoundResourceFromId(id);
        if (compoundResource) {
            return Math.ceil(amount / compoundResource.outputQuantity);
        }

        const rawResource = Utils.getRawResourceFromId(id);
        if (rawResource) {
            return amount;
        }

        return 0;
    }

    const getLocationForResourceId = (id: string) => {
        const compoundResource = Utils.getCompoundResourceFromId(id);
        if (compoundResource)
        {
            return compoundResource.workshop;
        }

        else return "";
    }
</script>

<div class="content">
    <div class="sidebar">
        <p>Expanded Ingredients</p>
        <ul>
            {#each expandedIngredients as expandedIngredient}
                <li>
                    <span>{expandedIngredient}</span>
                    <button onclick={() => RemoveFromExpandedIngredients(expandedIngredient)}>x</button>
                </li>
            {/each}
        </ul>
    </div>

    <table class="ingredientTable">
        <thead>
        <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {#if resource}
        {#each ingredientMap.entries() as [id, { amount, location }]}
            <tr>
                <td>
                    {#if Utils.getCompoundResourceFromId(id)}
                        <button onclick={() => AddToExpandedIngredients(id)}>{id}</button>
                    {:else}
                        <p>{id}</p>
                    {/if}
                </td>

                <td>{amount}</td>

                <td>{location}</td>
            </tr>
        {/each}
        {/if}
    </table>
</div>

<style>
    .content {
        display: inline-flex;
        width: 100%;
        flex-wrap: wrap;
    }

    .sidebar {
        flex-basis: 20rem;
        border: 2px solid black;
        margin: 1rem 2rem;

        p {
            background-color: black;
            margin: 0;
        }

        ul {
            padding: 0 0.5rem;
        }

        li {
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 0.25rem 0;
        }

        button {
            padding: 0.1rem 0.4rem;
            margin: 0 0.5rem;
        }
    }

    .ingredientTable {
        width: 100%;
        margin-top: 1rem;
        text-align: left;
        flex-grow: 1;
        flex-basis: content;

        thead {
            background-color: black;
        }

        td {
            margin: 0.25rem;
        }
    }
</style>