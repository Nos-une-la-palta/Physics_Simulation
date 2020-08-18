var canvas = document.querySelector("#lienzo");
ctx = canvas.getContext("2d");
var ball;
var message = "Simulador Bolita";
// Velocidad x
var vx = 5.0;
// Velocidad y : establecida aleatoriamente
var vy;
var gravity = 0.5;  
var bounce = 0.7; 
var xFriction = 0.1;
vy = (Math.random() * -15) + -5;
ball = {x:canvas.width / 2, y:100, radius:20, status: 0,   color:"red"};


function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height); 
//display some text
    ctx.fillStyle = "blue";
    ctx.font = "20px Arial";
    ctx.fillText(message, 20,20); 
//draw cirlce
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath(); 
    ballMovement();
    
}
setInterval(draw, 1000/35); 


function ballMovement(){
    ball.x += vx;
    ball.y += vy;
    vy += gravity; 
//Si la bolita choca en alguna pared
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
//sujeto a impulso y pérdida energética
        vx *= -1;
    } 
// Ball hits the floor(
    if (ball.y + ball.radius > canvas.height){ 
//sujeto a impulso y pérdida energética
        ball.y = canvas.height - ball.radius;
//Rebota : cambio de dirección de velocidad
        vy *= -bounce;
//do this otherwise, ball never stops bouncing
        if(vy<0 && vy>-2.1)
        vy=0;
        //do this otherwise ball never stops on xaxis
        if(Math.abs(vx)<1.1)
        vx=0;
        xF();
        
    }   
}

function xF(){
    if(vx>0)
    vx = vx - xFriction;
    if(vx<0)
    vx = vx + xFriction;
}
