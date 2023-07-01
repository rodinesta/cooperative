import {$host} from "./index";

export const createSector = async (formData) => {
    const {data} = await $host.post('api/sector', formData)
    return data
}

export const receiveSectors = async () => {
    const {data} = await $host.get('api/sector')
    return data
}

export const receiveSectorById = async (id) => {
    const {data} = await $host.get('api/sector/' + id)
    return data
}

export const changePhoto = async (formData) => {
    const {data} = await $host.put('api/sector', formData)
}