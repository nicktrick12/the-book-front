const url = "http://localhost:8080/api/v1/chatrooms"

export function createChatroom(idUser, idBook) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${idUser}/books/${idBook}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao criar! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data.id);
        })
        .catch((error) => {
            console.error("Error adding chatroom:", error);
            reject(error);
        });
    })
}

export function getChatroom(idChatroom) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/${idChatroom}`, {
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

