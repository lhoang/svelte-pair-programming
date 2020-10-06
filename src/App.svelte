<script lang="ts">
    import Chart from './Chart.svelte';

    export let url: string = '';
    let index = 0;
    let data = [];
    let currentData;

    $: fetchData = fetch(url)
        .then(response => response.json())
        .then(d => data = d.datasets ?? []);

    $: currentData = data[index];

</script>

<main>
    {#await fetchData}
        ...loading
    {:then}
        <select name="dataset" id="dataset" bind:value={index} class="select">
            {#each data as {city, pollen, year}, i}
                <option value={i}>{city} - {pollen} / {year}</option>
            {:else}
                <option value="">Pas de données</option>
            {/each}
        </select>
    {/await}

    <div class="viz">
        <Chart dataset={currentData}></Chart>

    </div>
</main>

<style type="text/scss">
  :root {
    --zenika-red: #b21e3e;
  }
  h1 {
    color: #ff3e00;
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>