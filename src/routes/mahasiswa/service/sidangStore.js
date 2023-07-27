import { writable } from "svelte/store";

const sidangStore = writable([]);

const judul = writable("");
const status = writable("");
const data = writable([]);

export { sidangStore, judul, status, data };