import {$host} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (login, password, fullName, phoneNumber, RoleId) => {
    const {data} = await $host.post('api/member/registration', {login, password, fullName, phoneNumber, RoleId})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
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