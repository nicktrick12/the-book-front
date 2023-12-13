const url = "http://localhost:8080/api/v1/books"

export function createBook(bookData) {
    // Returning the fetch Promise
    return new Promise((resolve, reject) => {
        fetch(`${url}/add`, {
            method: "POST",
            body: JSON.stringify(bookData),
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
            resolve(data.id);
        })
        .catch((error) => {
            console.error("Error creating book:", error);
            reject(error);
        });
    });
}

export function getBook(bookData){
    return new Promise((resolve, reject) => {
        fetch(`${url}/$`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao achar! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.error("Error finding chatroom:", error);
            reject(error);
        });
    })
}

export function getBookById (bookId){
    return new Promise((resolve, reject)=>{
        fetch(`${url}/${bookId}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            },
        })
        .then((response)=>{
            if (!response.ok) {
                throw new Error(`Erro ao achar! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.error("Error finding book:", error);
            reject(error);
        });
    })
}