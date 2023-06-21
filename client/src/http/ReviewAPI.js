import {$host} from "./index";

export const createReview = async (text, MemberId) => {
    const {data} = await $host.post('api/review', {text, MemberId})
    return data
}

export const receiveReviews = async () => {
    const {data} = await $host.get('api/review')
    return data
}

export const receiveOneReview = async (id) => {
    const {data} = await $host.get('api/review/' + id)
    return data
}

