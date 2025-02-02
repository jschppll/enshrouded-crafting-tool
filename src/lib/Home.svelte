<script lang="ts">
  import { onMount } from 'svelte';
  import data from "../resources/resource_data.js";
  import Utils from "../resources/utils"

  import type {CompoundResource} from "../resources/ResourceTypes";
  import ResourceTable from "./ResourceTable.svelte";

  let selectedWorkshop = $state<string>();
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
      if (resource.workshop == selectedWorkshop)
      {
        outResources.push(resource);
      }
    }

    return outResources;
  });
</script>

<div class="workshopButtons">
  {#each workshops  as workshop}
    <button class="resourceButton workshopButton" data-active={workshop === selectedWorkshop} onclick={() => selectedWorkshop = workshop}>{workshop}</button>
  {/each}
</div>

<div class="resourceButtons">
  {#each resourceList as compoundResource}
    <button class="resourceButton" data-active={selectedResource && compoundResource.id === selectedResource.id} onclick={() => selectedResource = Utils.getCompoundResourceFromId(compoundResource.id)}>{compoundResource.id}</button>
  {/each}
</div>

<div class="details">
  <div class="amount">
    <span>Amount: </span>
    <input bind:value={amount}>
  </div>

  {#if selectedResource}
    <ResourceTable resource = {selectedResource} amount = {amount} />
  {/if}
</div>

<style>
  .details {
    min-height: 10rem;
  }

  .resourceButtons {
    margin-bottom: 4rem;
  }

  .resourceButton {
    font-size: 14px;
    margin: 0.25rem;

      &[data-active="true"] {
        color: yellow;
      }
  }

  .workshopButton {
    background-color: #213547;
  }

  .amount {
    display: flex;
    margin: 0 1rem;

    span {
      margin: 0 1rem;
    }
  }
</style>