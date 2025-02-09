<script lang="ts">
  import {SvelteMap} from "svelte/reactivity";

  import data from "../resources/resource_data.js";
  import Utils from "../resources/utils"

  import Main from "./Main.svelte";
  import SlideToggle from "./SlideToggle.svelte";

  import type {CompoundResource} from "../resources/ResourceTypes";

  let selectedWorkshop = $state<string>("alchemist");
  let selectedResource = $state<CompoundResource>();

  let shoppingList = $state<SvelteMap<string, { resource: CompoundResource, amount: number } >>(new SvelteMap());

  let amount = $state(1);
  let bShowShoppingList = $state(false);

  $effect(() => {
    if (selectedResource) {
      amount = 1;
    }
  });

  // Populated on load
  let workshops = new Set<string>();
  for (const resource of data.compoundResources)
  {
    workshops.add(resource.workshop);
  }

  let resourceList = $derived.by(() => {
    let outResources: CompoundResource[] = [];

    for (const resource of data.compoundResources)
    {
      if (selectedWorkshop === "show_all")
      {
        outResources.push(resource);
      }
      else if (resource.workshop == selectedWorkshop)
      {
        outResources.push(resource);
      }
    }

    return outResources.sort();
  });

  let selectedItemAsList = $derived.by(() => {
    if (selectedResource) {
      return [ { resource : selectedResource, amount }];
    }

    return [];
  });

  const addSelectedToShoppingList = () => {
    if (selectedResource) {
      shoppingList.set(selectedResource.id, { resource: selectedResource, amount });
    }
  }

  const removeFromShoppingList = (itemToRemove: string) => {
    if (itemToRemove) {
      shoppingList.delete(itemToRemove);
    }
  }
</script>

<h1>Enshrouded Crafting Tool</h1>

<div class="workshopButtons">
  <button class="resourceButton workshopButton" data-active={selectedWorkshop === "show_all"} onclick={() => selectedWorkshop = "show_all"}>Show All</button>
  {#each [...workshops].sort()  as workshop}
    <button class="resourceButton workshopButton" data-active={workshop === selectedWorkshop} onclick={() => selectedWorkshop = workshop}>{workshop}</button>
  {/each}
</div>

<div class="resourceButtons">
  {#each resourceList as compoundResource}
    <button class="resourceButton" data-active={selectedResource && compoundResource.id === selectedResource.id} onclick={() => selectedResource = Utils.getCompoundResourceFromId(compoundResource.id)}>{compoundResource.id}</button>
  {/each}
</div>

<div class="optionBar">
  <SlideToggle label="Show Shopping List" bind:value={bShowShoppingList} />

  {#if !bShowShoppingList}
  <p>
    <span class="label">Amount: </span>
    <input bind:value={amount}>
  </p>
  {/if}
</div>

<Main
  resources = {bShowShoppingList ? [ ...shoppingList.values() ] : selectedItemAsList}
  {bShowShoppingList}
  {addSelectedToShoppingList}
  {removeFromShoppingList}
  shoppingList = {[ ...shoppingList.values() ]}
/>

<style>
  :root {
    --accent-color: #4dbd69;
    --highlight-color: #a7a3f1;
    --gray: #ccc;
    --dark-gray: #38374c;
  }

  h1 {
    margin: 1rem;
  }

  .resourceButtons {
    margin-bottom: 4rem;
    min-height: 4rem;
  }

  .workshopButtons {
    margin: 1rem 0;
  }

  .resourceButton {
    font-size: 1rem;
    margin: 0.25rem;

      &[data-active="true"] {
        color: var(--highlight-color);
      }
  }

  .workshopButton {
    background-color: var(--dark-gray);
    border-radius: 0;
    font-size: 0.75rem;
  }

  .optionBar {
    display: flex;
    margin: 1rem 0;
    min-height: 4rem;

    p {
        margin-left: 2rem;
    }
  }
</style>