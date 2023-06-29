import {$host} from "./index";
import jwt_decode from "jwt-decode"

export const registrateUser = async (login, password, firstName, secondName, thirdName, phoneNumber, RoleId) => {
    const {data} = await $host.post('api/member/registration', {login, password, firstName, secondName, thirdName, phoneNumber, RoleId})
    return data
}

export const loginFunc = async (login, password) => {
    const {data} = await $host.post('api/member/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const receiveMember = async (id) => {
    const {data} = await $host.get('api/member/' + id )
    return data
}

export const receiveMembers = async () => {
    const {data} = await $host.get('api/member/')
    return data
}

export const updatePhoto = async (formData) => {
    const {data} = await $host.put('api/member/updatePhoto', formData)
    return data
}

export const changeInfo = async (id, secondName, firstName, phoneNumber) => {
    const {data} = await $host.put('api/member/changeInfo', {id, secondName, firstName, phoneNumber})
    return data
}
