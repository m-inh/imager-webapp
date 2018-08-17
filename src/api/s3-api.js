import {get, post, put} from './api-sender';

export function getSignedUrl({fileName, fileType}) {
    return get(`/api/s3/signed-url?file-name=${encodeURIComponent(fileName)}&file-type=${encodeURIComponent(fileType)}`);
}

export function createS3Object({file, signedRequest}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error('Could not upload file'))
                }
            }
        };
        xhr.send(file);
    })
}