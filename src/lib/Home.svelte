<script lang="ts">
  import { onMount } from 'svelte';
  import data from "../resources/resource_data.js";
  import Utils from "../resources/utils"

  import type {CompoundResource} from "../resources/ResourceTypes";
  import ResourceTable from "./ResourceTable.svelte";

  let selectedWorkshop = $state<string>("alchemist");
  let selectedResource = $state<CompoundResource>();

  let amount = $state(1);

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

<div class="details">
  <h2><span class="label">Crafting:</span> {selectedResource ? selectedResource.id : ""}</h2>
  <h4><span class="label">Crafted By:</span> {selectedResource ? selectedResource.workshop : ""}</h4>
  <h4><span class="label">Ratio:</span> {selectedResource ? `${selectedResource.outputQuantity} / 1` : ""}</h4>
  <div class="amount">
    <span>Amount: </span>
    <input bind:value={amount}>
  </div>

    <ResourceTable resource = {selectedResource} bind:amount = {amount} />
</div>

<style>
  h1 {
    margin: 1rem;
  }

  .details {
    min-height: 10rem;

    .label {
      color: violet;
    }

    h2 {
      text-align: left;
      margin-left: 2rem;
      min-height: 1.5rem;
    }

    h4 {
      text-align: left;
      margin-left: 2rem;
      min-height: 1.5rem;
    }
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

  .amount {
    display: flex;
    margin: 0 1rem;

    span {
      margin: 0 1rem;
    }
  }
</style>