export function delay(after) {
    return new Promise(resolve => {
        setTimeout(resolve, after);
    });
}