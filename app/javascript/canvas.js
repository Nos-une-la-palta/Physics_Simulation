//var canvas = document.querySelector("#lienzo");
//var ctx = canvas.getContext("2d");
//console.log("ctx",ctx);

//ctx.fillStyle = "rgba(0,0,0,0.8)";
//ctx.fillRect(10,10,100,100);
//ctx.rect(10,10,100,100);
//ctx.stroke();
//Willy

function dick() {
    var canvas = document.querySelector("#lienzo");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.beginPath();
        ctx.arc(640,420,50,-0.35*Math.PI,0.7*Math.PI);
        ctx.arc(560,420,50,0.3*Math.PI,-0.65*Math.PI);
        ctx.moveTo(537,375);
        ctx.lineTo(537,100);
        ctx.lineTo(525,100);
        ctx.arc(600,100,75,Math.PI,0);
        ctx.lineTo(662,100);
        ctx.lineTo(662,375);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "rgba(220,194,152,0.3)";
        ctx.fill();  
    }
  }
function circulo() {
    var canvas = document.querySelector("#lienzo");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var grd2 = ctx.createRadialGradient(890,350,5,900,350,120);
        grd2.addColorStop(0,"white");
        grd2.addColorStop(1,"black");
        ctx.beginPath();
        ctx.arc(900,400,100,0,7);
        ctx.fillStyle = grd2;
        ctx.fill();  
    } 
}

function bezier() {
  var canvas = document.querySelector("#lienzo");
  if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var grd = ctx.createLinearGradient(150,400,150,500);
      grd.addColorStop(0,"red");
      grd.addColorStop(1,"yellow");
      ctx.lineWidth = 15;
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      ctx.moveTo(0,500);
      ctx.bezierCurveTo(200,300,400,400,500,500);
      ctx.stroke();
      ctx.lineTo(0,500);
      ctx.closePath();
      ctx.fillStyle = grd;
      ctx.fill();
  }
}