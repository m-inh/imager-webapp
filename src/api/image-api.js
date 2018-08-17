import {get, post, put} from './api-sender';

export function getImages({page_number, page_size}) {
    return get(`/api/images?page_size=${page_size || 5}&page_number=${page_number || 0}`);
}

export function createImage(payload) {
    return post('/api/images', payload);
}

