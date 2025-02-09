<script lang="ts">
    import { SvelteSet } from 'svelte/reactivity';
    import type {CompoundResource} from "../resources/ResourceTypes";
    import Utils from "../resources/utils"

    // Types //
    type IngredientMapType = Map<string, {
        amount: number,
        location: string
    }>;

    type onAddSelectedFn = () => void;
    type onRemovedFn = (itemToRemove: CompoundResource) => void;

    // Props //
    let {
        resources,
        bShowShoppingList,
        addSelectedToShoppingList,
        removeFromShoppingList,
        shoppingList,
    }: {
        resources: CompoundResource[],
        bShowShoppingList: boolean
        addSelectedToShoppingList: onAddSelectedFn,
        removeFromShoppingList: onRemovedFn,
        shoppingList: CompoundResource[],
    } = $props();


    // State //
    let expandedIngredients = $state<SvelteSet<string>>(new SvelteSet());
    let amount = $state(1);

    $effect(() => {
       if (resources) {
           expandedIngredients.clear();
           amount = 1;
       }
    });

    let ingredientMap = $derived.by(() => {
        const map: IngredientMapType = new Map();

        for (const resource of resources) {
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

        const rawResource = Utils.getRawResourceFromId(id);
        if (rawResource)
        {
            return rawResource.location;
        }

        return "";
    }
</script>

<div class="details">
    <div class="content">
        <div class="sidebar">
            {#if !bShowShoppingList}
            <h4><span class="label">Crafting:</span> {resources[0] ? resources[0].id : ""}</h4>
            <h4><span class="label">Crafted By:</span> {resources[0] ? resources[0].workshop : ""}</h4>
            <h4><span class="label">Ratio:</span> {resources[0] ? `${resources[0].outputQuantity} / 1` : ""}</h4>

            {:else}
                <h4><span class="label">Crafting:</span> Multi</h4>
            {/if}
            <h4>
                <span class="label">Amount: </span>
                <input bind:value={amount}>
            </h4>

            {#if !bShowShoppingList}
            <div class="options">
                <button onclick={() => addSelectedToShoppingList()}>Add To Shopping List</button>
            </div>
            {/if}

            {#if bShowShoppingList}
            <p>Shopping List</p>
                <ul>
                    {#each shoppingList as shoppingItem}
                        <li>
                            <span>{shoppingItem.id}</span>
                            <button onclick={() => removeFromShoppingList(shoppingItem)}>x</button>
                        </li>
                    {/each}
                </ul>
            {/if}

            {#if expandedIngredients.size > 0}
            <p>Expanded Ingredients</p>
            <ul>
                {#each expandedIngredients as expandedIngredient}
                    <li>
                        <span>{expandedIngredient}</span>
                        <button onclick={() => RemoveFromExpandedIngredients(expandedIngredient)}>x</button>
                    </li>
                {/each}
            </ul>
            {/if}
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
            {#if resources}
            {#each ingredientMap.entries() as [id, { amount, location }]}
                <tr>
                    <td>
                        {#if Utils.getCompoundResourceFromId(id)}
                            <button onclick={() => AddToExpandedIngredients(id)}>{id}</button>
                        {:else}
                            <p>{id}</p>
                        {/if}
                    </td>

                    <td><p>{amount}</p></td>

                    <td><p>{location}</p></td>
                </tr>
            {/each}
            {/if}
        </table>
    </div>
</div>

<style>
    .content {
        display: inline-flex;
        width: 100%;
        flex-wrap: wrap;
    }

    .details {
        min-height: 10rem;

        .label {
            color: var(--highlight-color);
        }

        h4 {
            text-align: left;
            min-height: 1.5rem;
        }
    }

    .sidebar {
        flex-basis: 20rem;
        margin: 0 1rem 0 0;
        border: 3px solid black;
        border-radius: 0.5em;
        padding: 0.5rem;

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

        .options {
            display: flex;
            width: 100%;

            button {
                padding: 0.5rem;
                margin: 1rem 0;

                &:hover {
                    background-color: var(--highlight-color);
                }

                &:active {
                    background-color: var(--dark-gray);
                    color: var(--highlight-color);
                }
            }
        }
    }

    .ingredientTable {
        width: 100%;
        text-align: left;
        flex-grow: 1;
        flex-basis: content;

        tbody {
            vertical-align: top;
        }

        th {
            background-color: black;
            padding: 0.5em;
        }

        td {
            margin: 0.25rem;
        }
    }
</style>