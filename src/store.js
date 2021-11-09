import { writable } from 'svelte/store';

export const filter = writable({
    hideDisorder: false
});