const url = "http://localhost:8080/api/v1/comments"

export function createComment(idChatroom, idUser) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${idUser}/chatrooms/${idChatroom}/add`, {
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
            console.error("Error adding comments:", error);
            reject(error);
        });
    })
}

export function getComments(idUser, idChatroom) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${idUser}/chatrooms/${idChatroom}`, {
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
            console.error("Error adding comments:", error);
            reject(error);
        });
    })
}

