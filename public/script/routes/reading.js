const url = "http://localhost:8080/api/v1/readings"

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