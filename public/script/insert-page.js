import { containerError, containerList } from "./components-page.js";
import { createBook } from "./routes/book.js";
import { createChatroom,getChatroom } from "./routes/chatroom.js";
import { createReading, favoriteReading } from "./routes/reading.js";

export function insertOnPage({title, author, publisher, publishedDate, pagesNumber, categories, imageLink, previewLink}) {
    const cardBook = $("<li>");
    cardBook.addClass("card");
    cardBook.html(`
        <img src="${imageLink}" class="card-img-top" onerror="this.src='/media/error-image';" alt="book image">
        <div class="card-body align-self-center" tabindex="0">
            <h5 class="card-title" aria-label="book title ${title}">${title}</h5>
            <p class="card-text"><em class="card__text__title">Author:</em> ${author}</p>
            <p class="card-text"><em class="card__text__title">Publisher:</em> ${publisher}</p>
            <p class="card-text"><em class="card__text__title">Published:</em> ${publishedDate}</p>
            <p class="card-text"><em class="card__text__title">Pages:</em> ${pagesNumber}</p>
            <p class="card-text"><em class="card__text__title">Category:</em> ${categories}</p>
            <a href="${previewLink}" class="btn link" aria-label="preview link in Google Books" tabindex="0"
            title="${title}" pages="${pagesNumber}" gender="imagine" 
            author="${author}" classification="1" summary="imagine" dataAdd="${publishedDate}" 
            bookState="AUTENTICADO" average="5">Read</a>
            <button class="btn create-chat-btn" title="${title}" pages="${pagesNumber}" gender="imagine" 
            author="${author}" classification="1" summary="imagine" dataAdd="${publishedDate}" 
            bookState="AUTENTICADO" average="5">Chat</button>
            <button class="btn create-book-btn" title="${title}" pages="${pagesNumber}" gender="imagine" 
            author="${author}" classification="1" summary="imagine" dataAdd="${publishedDate}" 
            bookState="AUTENTICADO" average="5">Favorite</button>
        </div>
        `);
    containerList.append(cardBook);

    cardBook.find(".link").click(function () {
        const button = $(this);
        const bookData = {
            title: button.attr("title"),
            pages: button.attr("pages"),
            gender: button.attr("gender"),
            author: button.attr("author"),
            classification: button.attr("classification"),
            summary: button.attr("summary"),
            dataAdd: button.attr("dataAdd"),
            idUserAdd: localStorage.getItem("idUser"),
            bookState: button.attr("bookState"),
            average: button.attr("average")
        };
        console.log(JSON.stringify("here's the book data: " + bookData))

        createBook(bookData)
            .then((idBook) => {
                console.log("book created has id: "+idBook)
                createReading(localStorage.getItem("idUser"), idBook)
                    .then((reading) => {
                        console.log(JSON.stringify(reading))
                    })
            })
            .catch((error) => {
                console.error("Error creating book deu pani:", error);
            })
    });

    cardBook.find(".create-book-btn").click(function () {
        const button = $(this);
        const bookData = {
            title: button.attr("title"),
            pages: button.attr("pages"),
            gender: button.attr("gender"),
            author: button.attr("author"),
            classification: button.attr("classification"),
            summary: button.attr("summary"),
            dataAdd: button.attr("dataAdd"),
            idUserAdd: localStorage.getItem("idUser"),
            bookState: button.attr("bookState"),
            average: button.attr("average")
        };
        console.log(JSON.stringify("here's the book data: " + bookData))

        createBook(bookData)
            .then((idBook) => {
                console.log("book created has id: "+idBook)
                createReading(localStorage.getItem("idUser"), idBook)
                    .then((reading) => {
                        favoriteReading(reading.idBook, reading.idUser)
                    })
            })
            .catch((error) => {
                console.error("Error creating book deu pani:", error);
            })
    });

    cardBook.find(".create-chat-btn").click(function () {

        const button = $(this);
        const bookData = {
            title: button.attr("title"),
            pages: button.attr("pages"),
            gender: button.attr("gender"),
            author: button.attr("author"),
            classification: button.attr("classification"),
            summary: button.attr("summary"),
            dataAdd: button.attr("dataAdd"),
            idUserAdd: localStorage.getItem("idUser"),
            bookState: button.attr("bookState"),
            average: button.attr("average")
        };
        console.log(JSON.stringify("here's the book data: " + JSON.stringify(bookData)))

        createBook(bookData)
            .then((idBook) => {
                console.log("book created has id: "+idBook)
                createChatroom(localStorage.getItem("idUser"), idBook)
                    .then((idChatroom) => {
                        console.log("entrei nos metodos " + idChatroom)
                        getChatroom(idChatroom)
                            .then(chatroom => {
                                const url = 'http://localhost:10003/chat';
                                window.location.href = `${url}?idChat=${chatroom.id}`;
                        })
                    })
            })
            .catch((error) => {
                console.error("Error creating Chatroom:", error);
            })
    });
}

export function errorOnPage(errorMessage) {
    containerError.html("");
    const errorText = $("<p>");
    errorText.html(errorMessage);
    containerError.show();
    containerError.append(errorText);
}