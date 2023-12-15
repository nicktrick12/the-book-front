var btnf =document.querySelector('#t1') 
var btnr =document.querySelector('#t2') 

var btn1 = document.querySelector('.fv');
var btn2 = document.querySelector('.red');

var exit = document.getElementById('exit');


btn1.addEventListener('click', function(){

    if(btnf.style.display === 'none'){
        btnf.style.display = 'block'
        btnr.style.display = 'none'
    } else{
            btnf.style.display = 'none'
    }
});

btn2.addEventListener('click', function(){

    if(  btnr.style.display === 'none'){
        btnr.style.display = 'block'
        btnf.style.display = 'none'
    } else{
        btnr.style.display = 'none';
    } 
});

exit.addEventListener('click', function(){

    var userId = localStorage.getItem("idUser");

    if (userId) {
        localStorage.removeItem("idUser");
        console.log("idUser removed from localStorage");
    } else {
        console.log("idUser not found in localStorage");
    }
    locationw.href("/")

});



