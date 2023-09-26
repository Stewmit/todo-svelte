import {authHost, host} from "./index.js";
import jwtDecode from "jwt-decode"

export const registration = async (name, surname, email, password) => {
    const {data} = await host.post('api/user/registration', {name, surname, email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await authHost.get('api/user/check')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const updateUser = async (user) => {
    const {data} = await authHost.put('api/user', user)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

// const formData = new FormData()
// formData.append('img', e.target.files[0])
// let data = await changeAvatar(formData)
export const changeAvatar = async (avatar) => {
    const {data} = await authHost.put('api/user/avatar', avatar)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const changePassword = async (id, oldPassword, newPassword) => {
    const {data} = await authHost.put('api/user/password', {id, oldPassword, newPassword})
    return data
}

export const deleteUser = async () => {
    const {data} = await authHost.delete('api/user')
    return data
}