import { writable } from "svelte/store";

export const tasks = writable([])

export const taskSort = writable('id')
export const taskFilter = writable('')
export const showComplete = writable(true)