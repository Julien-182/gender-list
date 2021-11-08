<script>
    import { slide } from 'svelte/transition';

    export let gender;

    let openDetails = false;
</script>

<article class="{'gender-card ' + (openDetails ? 'opened' : '')}">
    <h2 on:click={() => openDetails = !openDetails}>
        {gender.name}
        {#if gender.mentalDisorder}
            <i class="disorder" title="This gender is a mental disorder"></i>
        {/if}
    </h2>
    {#if openDetails}
        <div transition:slide class="details">
            <p>{gender.description}</p>
            {#if gender.mentalDisorder}
                <p class="disorder-note"><i class="disorder" title="This gender is a mental disorder"></i> This gender is a mental disorder</p>
            {/if}
        </div>
    {/if}
</article>

<style>
.gender-card {
    /*background-color: white;*/
    border-radius: 4px;
    padding: 0.5em 1em;
    display: inline-block;
    cursor: pointer;
   /* box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;*/
}
.gender-card h2 {
    margin-top: 0.25em;
    font-weight:normal;
    transition: 0.25s ease-in-out;
}

.gender-card.opened h2 {
    font-weight: bold;
}

.gender-card.opened {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    margin-bottom: 1em;
}

i.disorder {
    background-image: url("./brain.svg");
    background-size: 0.75rem;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    color: white;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: #bf1996;
    vertical-align: middle;
    margin: 0 0.25em;
}
.disorder-note {
    color: #bf1996;
    font-size: 0.75em;
    display: flex;
    align-items: center;
}
</style>