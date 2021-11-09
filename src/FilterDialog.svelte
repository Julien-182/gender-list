<script>
    import {filter} from "./store";

    export let opened;

    function toggleDialog() {
        opened = !opened
    }
</script>

<div class="dialog-container">
    <div class="dialog-body">
        <div class="filter">   
            <label for="hideMental">
                <input id="hideMental" type="checkbox" bind:checked={$filter.hideDisorder}>
                Hide Mental disorders
            </label>
        </div>
        <button on:click={toggleDialog}>OK</button>
    </div>
    <div class="overlay on:click={toggleDialog}"></div>
</div>

<style>

    .dialog-container {
        color: #111;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog-body {
        z-index: 200;
        width: 80vw;
        max-width: 300px;
        min-height: 100px;
        background: white;
        padding: 0.25em;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        border-radius: 0.25em;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #1119;
    }

    .filter {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1em;
    }
    
    .filter input {
        margin-right: 0.25em;
    }

</style>