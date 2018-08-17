import {get, post, put, postWithoutAuth} from './api-sender';

export function login(payload) {
    return postWithoutAuth('/api/users/login', payload);
}

export function register(payload) {
    return postWithoutAuth('/api/users/register', payload);
}
