import {$host} from "./index";

export const createComment = async (text, ReviewId, MemberId) => {
    const {data} = await $host.post('api/comment', {text, ReviewId, MemberId})
    return data
}

export const receiveComments = async () => {
    const {data} = await $host.get('api/comment')
    return data
}


