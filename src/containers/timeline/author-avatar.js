const avatar = {
    male: [
        './image/ic_boy_1.png',
        './image/ic_boy_2.png',
        './image/ic_boy_3.png',
        './image/ic_boy_4.png',
    ],
    female: [
        './image/ic_girl_1.png',
        './image/ic_girl_2.png',
        './image/ic_girl_3.png',
    ]
};

let authors = {};

function getRandomAva(gender) {
    const listAva = avatar[gender];
    return listAva[Math.floor(Math.random() * 10) % listAva.length];
}

export function getAvatarOf({name, gender}) {
    if (authors[name]) {
        return authors[name];
    } else {
        const randomAva = getRandomAva(gender);
        authors[name] = randomAva;
        return randomAva;
    }
}