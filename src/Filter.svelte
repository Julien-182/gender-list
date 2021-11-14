<script>
    import FilterDialog from "./FilterDialog.svelte";

    let opened = false;

    function openDialog() {
        opened = !opened
        console.log(opened)
    }
</script>

<i class="filter-icon" tabindex="0" on:click={openDialog}>
    <img src="./filter.svg" alt="filter icon">
</i>


{#if opened}
    <FilterDialog bind:opened={opened} />
{/if}

<style lang="scss" type="text/scss">
    .filter-icon {
        display: inline-flex;
        height: 2em;
        width: 2em;
        margin-right: 0.5em;
    }
</style>