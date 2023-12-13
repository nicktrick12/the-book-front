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

export function getFavorites(userId) {
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

document.addEventListener("DOMContentLoaded", function () {

    const listaFavoritos = document.querySelector(".nav-item.dropdown");
    const userId = localStorage.getItem("idUser");
    console.log(userId)
    
    
    getFavorites(userId)
    .then((favorites) => {
        let listOfFavoritos = []

        console.log(JSON.stringify(favorites))

        for (const reading of favorites) {
            const cardFavorite = document.createElement('li');
            console.log(JSON.stringify(reading))
    
            cardFavorite.innerHTML = `
                <li class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                    //fazer função getBook(idBook)
                    //getBook(reading.idBook)
                    //ai voce pega a resposta e ai sim tu coloca 
                    //no cartão. assim:
                    //$-{book.title}
                ${reading.idBook}
                </li>
            `;

            getBookById(reading.idBook)
                .then((books) => {
                    console.log(JSON.stringify(books))
    
            })

            listOfFavoritos.push(reading);
            listaFavoritos.appendChild(cardFavorite);
        }
        console.log(listOfFavoritos)
    }) 
    .catch((error) => {
        console.error("Error getting favorites:", error);
    });

    

});