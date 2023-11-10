const express = require("express");
const app = express();

app.use(express.static('public'));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/html/index.html");
});

app.get("/entrar", function(req, res){
    res.sendfile(__dirname+"/public/html/entrar.html");
});

app.get('/cadastro', function(req, res){
    res.sendfile(__dirname+"/public/html/cadastro.html");
});

app.get('/perfil', function(req, res){
    res.sendfile(__dirname+"/public/html/perfil.html");
});

app.get('/perfilF', function(req, res){
    res.sendfile(__dirname+"/public/html/perfilF.html");
});

app.get('/chat', function(req, res){
    res.sendfile(__dirname+"/public/html/chatSala.html");
});












app.listen(10003, function(){
    console.log("servidor rodando na url http://localhost:10003");
})

