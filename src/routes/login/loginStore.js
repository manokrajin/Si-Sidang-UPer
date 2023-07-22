import { writable } from 'svelte/store';

// Initial login state is set to false
export const loginState = writable(false);