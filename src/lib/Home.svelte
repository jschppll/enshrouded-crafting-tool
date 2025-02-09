<script lang="ts">
  import data from "../resources/resource_data.js";
  import Utils from "../resources/utils"

  import type {CompoundResource} from "../resources/ResourceTypes";
  import ResourceTable from "./ResourceTable.svelte";
  import SlideToggle from "./SlideToggle.svelte";

  let selectedWorkshop = $state<string>("alchemist");
  let selectedResource = $state<CompoundResource>();

  let shoppingList = $state<CompoundResource[]>([]);

  let bShowShoppingList = $state(false);

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
      return [ selectedResource ];
    }

    return [];
  });

  const addSelectedToShoppingList = () => {
    if (selectedResource) {
      shoppingList.push(selectedResource);
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

<div class="shoppingList">
  <SlideToggle label="Show Shopping List" bind:value={bShowShoppingList} />
</div>


<ResourceTable
  resources = {bShowShoppingList ? shoppingList : selectedItemAsList}
  {bShowShoppingList}
  {addSelectedToShoppingList}
  {shoppingList}
/>

<style>
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
        color: violet;
      }
  }

  .workshopButton {
    background-color: #213547;
    border-radius: 0;
    font-size: 0.75rem;
  }

  .shoppingList {
    margin: 1rem 0;
  }
</style>