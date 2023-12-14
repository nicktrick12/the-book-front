const url = "http://localhost:8080/api/v1/comments"
const urlUser = "http://localhost:8080/api/v1/users"

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

export function getUserById(userId) {
    return new Promise((resolve, reject) => {
        fetch(`${urlUser}/id/${userId}`, {
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
            console.error("Error adding user:", error);
            reject(error);
        });
    })
}

export function loadComments(chatroomId) {
    const messagesContainer = document.querySelector(".message-container");
    messagesContainer.innerHTML = "";

    getComments(chatroomId)
    .then((comments) => {
        let listOfComments = []
        let name = "";

        for (const comment of comments) {
            const cardMessage = document.createElement('li');

            console.log(comment.idUser +"  "+localStorage+ "  Aqui")

            getUserById(comment.idUser)
            .then((user) => {
                name = user.username;
                console.log(user.name + " " + JSON.stringify(user))
                if (comment.idUser == localStorage.idUser){
                    cardMessage.innerHTML = `
                    <div class="msg" style="background-color: green; color: white; ">
                        <h5>${name}</h5>
                        <p>${comment.text}</p>
                    </div>
                    `
                
                } else{
    
                    cardMessage.innerHTML = `
                    <div class="msg" style="background-color: White">
                        <h5>${name}</h5>
                        <p>${comment.text}</p>
                    </div>
                    `
    
                }
            });

    
            listOfComments.push(comment);
            messagesContainer.appendChild(cardMessage);
        }
        console.log(listOfComments);
    }) 
    .catch((error) => {
        console.error("Error getting comments:", error);
    });
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
                loadComments(chatroomId);
                commentInput.value = "";
            })
            .catch((error) => {
                console.error("Error creating comment:", error);
            });
        
    });

    loadComments(chatroomId)

});
