<script lang="ts">
    import {scaleTime, scaleLinear} from 'd3-scale';
    import type {ScaleTime, ScaleLinear} from 'd3-scale';
    import {axisBottom, axisLeft} from 'd3-axis';
    import type {Axis, AxisDomain} from 'd3-axis';
    import {timeFormat, timeParse} from 'd3-time-format';
    import {select as d3select} from 'd3-selection';
    import {line as d3line} from 'd3-shape';
    import {onMount} from 'svelte';
    import {draw} from 'svelte/transition';
    import type {CleanPollen, Pollen} from './models/pollens.interface';


    export let dataset: Pollen = {
        city: '',
        pollen: '',
        year: 0,
        data: [],
    };
    export let width = 350;
    export let height = 200;

    const margin = {top: 20, right: 20, bottom: 20, left: 25};

    // Echelles et Axes
    let xScale: ScaleTime<number, number>,
        yScale: ScaleLinear<number, number>,
        xAxis: Axis<AxisDomain>,
        yAxis: Axis<AxisDomain>,
        keyId: string,
        cleanData: Array<CleanPollen>;

    $:keyId = [dataset.pollen,dataset.city,dataset.year].join(',')

    $: xScale = scaleTime()
        .domain([new Date(2000, 0, 1), new Date(2000, 11, 31)])
        .range([margin.left, width - margin.right]);

    $: yScale = scaleLinear()
        .domain([0, 5])
        .range([height - margin.bottom, margin.top]);

    // Abscisse avec juste le mois
    $: xAxis = axisBottom(xScale)
        .tickFormat(timeFormat('%b'));

    $: yAxis = axisLeft(yScale);

    // Parsing des timestamps
    const parse = timeParse('%Q');

    const getDay = (ts: number): Date => {
        const day = parse('' + ts);
        if (day) {
            day.setFullYear(2000);
        }
        return day ?? new Date(2000, 1, 1);
    }

    $: cleanData = dataset.data
        .sort((a, b) => a.date - b.date)
        .map(({level, date}) => ({
            level,
            date: getDay(date),
        }));
    //$: console.log(cleanData);

    $: path = d3line<CleanPollen>()
        .x(d => xScale(d.date))
        .y(d => yScale(d.level))(cleanData);


    onMount(() => {
        setTimeout(() => {
            d3select('g.xAxis').call((xAxis));
            d3select('g.yAxis').call((yAxis));
        })
    })

</script>

<div class="chart">
    <h2>Données de {dataset.pollen} à {dataset.city} en {dataset.year}</h2>
    <svg {width} {height}>
        <g class="data">
            {#key keyId}
            <path d={path} in:draw={{duration: 2000}}></path>
            {/key}
        </g>

        <g class="axis">
            <g class="xAxis" transform={`translate(0, ${height - margin.bottom})`}></g>
            <g class="yAxis" transform={`translate(${margin.left}, 0)`}></g>
        </g>


    </svg>

    <div class="legend">
        <span>Niveau de pollen :</span>
        <span>0: 😃</span>
        <span>1: 😐</span>
        <span>2: 🤧</span>
        <span>3: 😰</span>
        <span>4: 😱</span>
        <span>5: 💀</span>
    </div>
</div>

<style type="text/scss">

  .chart {
    width: min-content;
    width: -moz-min-content;


  }

  .legend {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
  }

  g.data path {
    stroke: var(--zenika-red);
    stroke-width: 2px;
    fill: none;
  }
</style>