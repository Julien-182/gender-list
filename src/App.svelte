<script>
	import GenderCard from "./GenderCard.svelte"
	import Filter from "./Filter.svelte"
	import Footer from "./Footer.svelte"
	import {filter} from "./store";
	import { onDestroy, onMount } from "svelte";


	// Attributes
	const genderUrl = `https://maximeblanc.fr/api/genders`
	let gendersByName = null
	let promise = null;
	let filteredGenders = null;

	// Methods/functions
	function groupByName(list) {
		const map = new Map();
		list.forEach((item) => {
			const key = item.name[0].toUpperCase();
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}

	async function fetchGenders() {
		console.log("Fetching genders...")
		return fetch(genderUrl, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}).then((response) => {
			if (!response.ok) {
				throw new Error(response.error)
			}
			return response.json();
		}).then((data) => {
			gendersByName = groupByName(data);
			return gendersByName;
		}).catch((error) => {
			console.error(error)
		});
	}

	function filterGenders(byName, filter) {
		if (!byName) {
			return byName;
		}

		let filtered = new Map()
		byName.forEach((list, letter) => {
			let filteredList = list.filter((g) => !(filter.hideDisorder && g.mentalDisorder));
			if (filteredList.length) {
				filtered.set(letter, filteredList);
			}
		})
		return filtered;
	}

	// Store subscription
	const filterUnsubscribe =filter.subscribe((f) => {
		filteredGenders = filterGenders(gendersByName, f);
	})

	// Lifecycle
	onMount(async () => {
		promise = fetchGenders();
	})

	onDestroy(filterUnsubscribe);

	// Watchers
	$: filteredGenders = filterGenders(gendersByName, filter);
</script>

<nav>
	<h1>Gender List</h1>
	<Filter/>
</nav>

<main>
	{#await promise}
		<p class="notitication-message">Loading gender...</p>
	{:then _response}
		{#if filteredGenders && filteredGenders.size > 0}
			<dl>
				{#each [...filteredGenders] as [key,genderList]}
					<dt>{key}</dt>
					{#each genderList as gender}
						<dd>
							<GenderCard {gender} />
						</dd>
					{/each}
				{/each}

			</dl>
		{:else}
			<p class="notitication-message">The list is empty</p>
		{/if}
	{:catch error}
		<p class="notitication-message">Very sadly, an error occured while retrieving the dis..genders :(</p>
	{/await}
</main>
<Footer/>

<style>
	nav {
		position: sticky;
		display: flex;
		width: 100%;
		top:0;
		background-color: var(--accent-color);
		color: white;
		z-index: 2;
		height: 3em;
		padding: 0.25em 0;
		justify-content: space-between;
		align-items: center;
		box-shadow: rgba(117, 70, 96, 0.35) 0px 5px 15px;
	}
	nav h1 {
		margin-left: 0.25em;
	}
	main {
		text-align: center;
		max-width: 540px;
		width: 100%;
		min-height: calc(100vh - 8em);
		background: white;
		margin: auto;
		border: 1px solid #eee;
	}

	dl {
		width: 100%;
		display: grid;
		grid-template-columns: 3rem 1fr 1em;
		margin: 0;
		padding-top: 1em;
	}

	dd {
		grid-column: 2;
		text-align: left;
		margin: 0;
	}

	dt {
		position: sticky;
		top: 3.5em;
		left: 0;
		font-size: 1.5em;
		color: #333;
		background-color: #fff;
		height: 2rem;
		width: 3rem;
		border-radius: 50%;
		padding: 0.5rem 1.2rem;
		grid-column: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
  		box-sizing: border-box;
		margin-left: 0.5rem;
		text-decoration: underline;
		text-decoration-color: currentcolor;
		text-decoration-color: var(--accent-color);
		text-decoration-thickness: 3px;
	}
</style>