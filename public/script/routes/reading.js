import { getBookById } from "./book.js";

const url = "http://localhost:8080/api/v1/readings";

export function createReading(idUser, idBook) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${idUser}/books/${idBook}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.error("Error adding reading:", error);
            reject(error);
        });
    })
}

export function favoriteReading(idBook, idUser) {
    fetch(`${url}/users/${idUser}/books/${idBook}/favorite`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.error("Error adding reading:", error);
        throw error;
    });
}

export function getReadings(userId) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.error("Error getting favorites:", error);
            reject(error);
        });
    })
}

export function getFavorites(userId) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/favorites/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.error("Error getting favorites:", error);
            reject(error);
        });
    })
}

document.addEventListener("DOMContentLoaded", function () {

    const listaFavoritos = document.querySelector(".cf");
    const userId = localStorage.getItem("idUser");
    console.log(userId)

    getFavorites(userId)
    .then((favorites) => {
        let listOfFavoritos = []

        console.log(JSON.stringify(favorites))

        for (const reading of favorites) {
            const cardFavorite = document.createElement('div');
        
            getBookById(reading.idBook)
                .then((book) => {
                    console.log(JSON.stringify(book));
                    console.log(book.title);
        
                    // Adicione o título do livro ao elemento cardFavorite
                    cardFavorite.textContent = book.title;
        
                    // Adicione a classe 'cd' ao elemento cardFavorite
                    cardFavorite.classList.add('cfChild');
        
                    // Adicione cardFavorite à listaFavoritos
                    listaFavoritos.appendChild(cardFavorite);
                })
                .catch((error) => {
                    console.error("Error getting book:", error);
                });
        }
        console.log(listOfFavoritos)
    }) 
    .catch((error) => {
        console.error("Error getting favorites:", error);
    }); 

});

document.addEventListener("DOMContentLoaded", function () {

    const listReading= document.querySelector(".cr");
    const userId = localStorage.getItem("idUser");

    getReadings(userId)
    .then((readings) => {

        console.log(JSON.stringify(readings))

        for (const reading of readings) {
            const cardReading = document.createElement('div');
        
            getBookById(reading.idBook)
                .then((book) => {
                    console.log(JSON.stringify(book));
                    console.log(book.title);
        
                    // Adicione o título do livro ao elemento cardFavorite
                    cardReading.textContent = book.title;
        
                    // Adicione a classe 'cd' ao elemento cardFavorite
                    cardReading.classList.add('crChild');
        
                    // Adicione cardFavorite à listaFavoritos
                    listReading.appendChild(cardReading);
                })
                .catch((error) => {
                    console.error("Error getting book:", error);
                });
        }
    }) 
    .catch((error) => {
        console.error("Error getting readings:", error);
    }); 

});