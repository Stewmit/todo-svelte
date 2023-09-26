import {authHost} from "./index.js";

export const createTask = async (task) => {
    const {data} = await authHost.post('api/task', task)
    return data
}

export const fetchAllTasks = async (sort, filter) => {
    const {data} = await authHost.get('api/task', {params: {sort, filter}})
    return data
}

export const fetchBetween = async (startDate, endDate) => {
    const {data} = await authHost.get('api/task/between', {params: {startDate, endDate}})
    return data
}

export const fetchSuggested = async () => {
    const {data} = await authHost.get('api/task/suggested')
    return data
}

export const fetchOneTask = async (id) => {
    const {data} = await authHost.get('api/task/' + id)
    return data
}

export const updateTask = async (task) => {
    const {data} = await authHost.put('api/task', task)
    return data
}

export const deleteTask = async (id) => {
    const {data} = await authHost.delete('api/task', { data: { id } })
    return data
}