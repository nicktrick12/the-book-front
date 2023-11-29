
const cardMessage=$('<li>')
cardMessage.addClass("message-container")
cardMessage.html(`
    <div class="msg">
        <p></p>
    </div>
    `);

const chat = document.getElementsByClassName("chat-container");
chat.append(cardMessage);

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

    .message-container {
        height: 450px;
        left: 10px;
        border-radius: 5px;
        overflow-y: scroll;
        margin-bottom: 10px;
        padding: 10px;
        display: flex;
        justify-content: center;
    }
`;

document.head.appendChild(style);