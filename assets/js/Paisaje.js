var frame = window.requestAnimationFrame;
var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext("2d");
var imagenSVG = new Image();
var numero = 0;
var ux = 0;
var animacion;



imagenSVG.src = "assets/img/2.svg";
imagenSVG.onload = function(){
    ctx.drawImage(imagenSVG,100,100,500,467);
}

var imagenSprite = new Image();
imagenSprite.src = "assets/img/bob.png";
imagenSprite.onload = function(){
    ctx.drawImage(imagenSprite,0,0,128,222,0,0,128,222);
}

function tiempo(){
    if(numero >= 640){numero = 0} else {numero  += 20}

    for (var i = 0; i <= numero; i +=128){
        if (numero >= i){ux = i}
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(imagenSprite,ux,0,128,222,0,0,128,222);
    animacion = frame(tiempo);
}

tiempo();

setTimeout(function(){    
    cancelAnimationFrame(animacion);
},3000);

