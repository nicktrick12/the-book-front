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

export function getComments(idChatroom) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/chatrooms/${idChatroom}`, {
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
    const commentInput = document.querySelector(".message-input");
    const commentText = {
        text: commentInput.value
    };

    submitCommentButton.addEventListener("click", function () {
        const userId = localStorage.getItem("idUser");

        createComment(userId, chatroomId, commentText)
            .then((data) => {
                console.log("Comment created successfully:", data);
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
    });
});

 let chatList = getComments(getChatroomIdFromUrl)
chatList.then((comments) => {
    const chat = document.getElementsByClassName("chat-container");

    for (const comment of comments) {
        const cardMessage = $('<li>');

        cardMessage.html(`
            <div class="msg">
                <p>${comment.text}</p>
            </div>
        `);

        chat.append(cardMessage);
    }
});


const style = document.createElement('style');
style.innerHTML = `
    .msg {
        background-color: white;
        width: 800px;
        word-wrap: break-word;
        height: fit-content;
        border-radius: 10px;
        padding: 10px;
    }
`;

document.head.appendChild(style);