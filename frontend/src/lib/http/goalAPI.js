import {authHost} from "./index.js"

export const createGoal = async (goalFormData) => {
    const {data} = await authHost.post('api/goal', goalFormData)
    return data
}

export const fetchOneGoal = async (id) => {
    const {data} = await authHost.get('api/goal/' + id)
    return data
}

export const fetchAllGoals = async () => {
    const {data} = await authHost.get('api/goal')
    return data
}

export const fetchFeed = async (categoryFilter) => {
    const {data} = await authHost.get('api/goal/feed', {params: {categoryFilter}})
    return data
}

export const updateGoal = async (goalFormData) => {
    const {data} = await authHost.put('api/goal', goalFormData)
    return data
}

export const publishGoal = async (id, isAchieved) => {
    const {data} = await authHost.put('api/goal/publish', {id, isAchieved})
    return data
}

export const deleteGoal = async (id) => {
    const {data} = await authHost.delete('api/goal', { data: { id } })
    return data
}