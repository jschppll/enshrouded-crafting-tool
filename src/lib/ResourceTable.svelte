<script lang="ts">
    import type {CompoundResource} from "../resources/ResourceTypes";
    import Utils from "../resources/utils"
    import { SvelteSet } from 'svelte/reactivity';

    let { resource, amount }: { resource: CompoundResource | undefined, amount: number } = $props();

    let expandedIngredients = $state<SvelteSet<string>>(new SvelteSet());

    $effect(() => {
       if (resource) {
           expandedIngredients.clear();
       }
    });


    let ingredientMap = $derived.by(() => {
        const map = new Map();

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

    const Expand = (id: string, amount: number, outMap: Map<any, any>) => {
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

    const addToIngredientMap = (id: string, amount: number, outMap: Map<any, any>) => {
        // If the map already has this ingredient in it then add our expanded
        // quantity to the existing quantity
        if (outMap.has(id))
        {
            const existingQuantity = outMap.get(id);
            outMap.set(id, amount + existingQuantity);
        }
        else
        {
            outMap.set(id, amount);
        }
    }

    const AddExpandedIngredientToMap = (ingredient : string) => {
        expandedIngredients.add(ingredient);
    };

    const RemoveExpandedIngredientFromMap = (ingredient : string) => {
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
</script>

<div class="content">
    <div class="sidebar">
        <p>Expanded Ingredients</p>
        <ul>
            {#each expandedIngredients as expandedIngredient}
                <li>
                    <span>{expandedIngredient}</span>
                    <button onclick={() => RemoveExpandedIngredientFromMap(expandedIngredient)}>x</button>
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
        {#each ingredientMap.entries() as [id, amount]}
            <tr>
                <td>
                    {#if Utils.getCompoundResourceFromId(id)}
                        <button onclick={() => AddExpandedIngredientToMap(id)}>{id}</button>
                    {:else}
                        <p>{id}</p>
                    {/if}
                </td>

                <td>{amount}</td>

                <td></td>
            </tr>
        {/each}
        {/if}
    </table>
</div>

<style>
    .content {
        display: inline-flex;
        width: 100%;
    }

    .sidebar {
        width: 20rem;
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

        thead {
            background-color: black;
        }

        td {
            margin: 0.25rem;
        }
    }
</style>