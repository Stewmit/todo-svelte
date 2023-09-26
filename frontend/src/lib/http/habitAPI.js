import {authHost} from "./index.js"

export const createHabit = async (habit) => {
    const {data} = await authHost.post('api/habit', habit)
    return data
}

export const fetchAllHabits = async () => {
    const {data} = await authHost.get('api/habit')
    return data
}

export const fetchOneHabit = async (id) => {
    const {data} = await authHost.get('api/habit/' + id)
    return data
}

export const updateHabit = async (habit) => {
    const {data} = await authHost.put('api/habit', habit)
    return data
}

export const deleteHabit = async (id) => {
    const {data} = await authHost.delete('api/habit', { data: { id } })
    return data
}

export const addDay = async (date, habitId) => {
    const {data} = await authHost.post('api/habit/day', {date, habitId})
    return data
}

export const deleteDay = async (id) => {
    const {data} = await authHost.delete('api/habit/day', { data: { id } })
    return data
}