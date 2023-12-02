const url = "http://localhost:8080/api/v1/comments"

function getChatroomIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("idChat");
}

export function createComment(idUser, idChatroom, commentText) {
    return new Promise((resolve, reject) => {

        fetch(`${url}/users/${idUser}/chatrooms/${idChatroom}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentText),
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


document.addEventListener("DOMContentLoaded", function () {
    const chatroomId = getChatroomIdFromUrl();

    const submitCommentButton = document.querySelector(".send-button");

    submitCommentButton.addEventListener("click", function () {
        const userId = localStorage.getItem("idUser");
        const commentInput = document.querySelector(".message-input");
        const commentText = {
            text: commentInput.value
        };

        createComment(userId, chatroomId, commentText)
            .then((data) => {
                console.log("Comment created successfully:", data);
            
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
    });
});
