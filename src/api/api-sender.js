import axios from "axios";
import ConfigService from "../services/ConfigService";
import AuthenService from "../services/AuthenService";

const BASE_URL = ConfigService.get('BASE_URL');

export function get(route) {
    const url = BASE_URL + route;
    const authInstance = createAuthInstance();
    return authInstance.get(url)
        .then(handleResponse)
}

export function post(route, payload) {
    const url = BASE_URL + route;
    const authInstance = createAuthInstance();
    return authInstance.post(url, payload)
        .then(handleResponse)
}

export function put(route, payload) {
    const url = BASE_URL + route;
    const authInstance = createAuthInstance();
    return authInstance.put(url, payload)
        .then(handleResponse)
}

export function postWithoutAuth(route, payload) {
    const url = BASE_URL + route;
    return axios.post(url, payload)
        .then(handleResponse)
}

function handleResponse(res) {
    return new Promise((resolve, reject) => {
        if (res.data && res.data.success) {
            return resolve(res.data.data);
        } else if (res.data && !res.data.success) {
            return reject(new Error(res.data.reason));
        } else {
            reject(new Error("Lỗi cmnr"));
        }
    });
}

function createAuthInstance() {
    const userInfo = AuthenService.get();
    return axios.create({
        timeout: 5000,
        headers: {"authorization": `${userInfo.username}:${userInfo.password}`}
    });
}