import storageService from "./StorageService";

let listeners = {};

function broadcast() {
    Object.keys(listeners).forEach(
        k => listeners[k]()
    );
}

export default {
    set: (newImage) => {

        broadcast();
    },
    onChange: (key, cb) => {
        listeners[key] = cb;
    },
    unChange: (key) => {
        delete listeners[key];
    }
}
