var btnf =document.querySelector('#t1') 
var btnr =document.querySelector('#t2') 

var btn1 = document.querySelector('.fv');
var btn2 = document.querySelector('.red');


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

