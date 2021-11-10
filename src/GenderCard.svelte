<script>
    import { slide } from 'svelte/transition';

    export let gender;

    function handleKey(event) {
        if (event.code == "Enter" || event.code == "Space") {
            openDetails = !openDetails
        }
    }

    let openDetails = false;
</script>

<article class="{'gender-card ' + (openDetails ? 'opened' : '')}" aria-expanded="{openDetails}">
    <h2 tabindex="0" role="button" aria-pressed="false" on:click={() => openDetails = !openDetails} on:keydown={handleKey}>
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
    margin-top: 0;
    font-weight:normal;
    transition: 0.25s ease-in-out;
    word-break: break-all;
    font-size: 1.3rem;
    transition: 0.25s ease-out;
    transition-property: transform;
    display: inline-block;
    padding-bottom: .25em;
}

.gender-card h2:focus {
    outline: none;
    border-bottom: 1px dashed var(--accent-color);
}

.gender-card.opened h2 {
    transform: scale(1.025);
    margin-bottom: 0;
}

.gender-card.opened {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    margin-bottom: 1em;
}

i.disorder {
    background-image: url("../brain.svg");
    background-size: 0.75rem;
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    color: white;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: var(--accent-color);
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