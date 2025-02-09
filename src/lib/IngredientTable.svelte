<script lang="ts">
    import Utils from "../resources/utils"

    import type {IngredientMapType} from "../resources/ResourceTypes.js";

    type onAddToExpandedListType = (itemToAdd: string) => void;

    let { ingredientMap, onAddToExpandedList }: { ingredientMap: IngredientMapType, onAddToExpandedList: onAddToExpandedListType } = $props();

</script>

<table class="ingredientTable">
    <thead>
    <tr>
        <th>Ingredient</th>
        <th>Quantity</th>
        <th>Location</th>
    </tr>
    </thead>
    <tbody>
    {#if ingredientMap.size > 0}
    {#each ingredientMap.entries() as [id, { amount, location }]}
        <tr>
            <td>
                {#if Utils.getCompoundResourceFromId(id)}
                    <button onclick={() => onAddToExpandedList(id)}>{id}</button>
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

<style>
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
