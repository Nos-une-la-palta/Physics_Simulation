/*-------------------------------------------------------------------------------*/
/*--------------------------------Variables--------------------------------------*/
/*-------------------------------------------------------------------------------*/
var canvas = document.querySelector("#lienzo");
// radio bolitas  
var r = 12;
// masas bolitas
var m = 1;
// apertura pared
var ap = (canvas.height/2) - 100;
console.log(ap)
// ancho pared
var ancho =10; 
// -----------------  Número bolitas (menor a 400 o explota) -------------------
var getBolitasRangeId = document.getElementById("bolitas_range");
var NB = Number(getBolitasRangeId.value); 

document.getElementById("n_bolitas").innerText = NB

getBolitasRangeId.addEventListener('change', bolitas_range)

function bolitas_range(e){
    document.getElementById("n_bolitas").innerText = e.target.value;
    NB = Number(e.target.value);
    console.log("Numero bolitas", NB)
}

// -----------------  Número bolitas END(menor a 400 o explota) -------------------
// ancho de línea de dibujo (relevante para las coordenadas y la impresión de superposición)
var strk = 2;
// prototipo hacia la energía cinética. factor de amplificación de velocidad media de partículas.
// -----------------  BOOOOST   -------------------
var ch_boost = false;
var getBoostRangeId = document.getElementById("boost_range");
var boost = Number(getBoostRangeId.value);

document.getElementById("boost").innerText = boost

getBoostRangeId.addEventListener('change', boost_range)

function boost_range(e){
    document.getElementById("boost").innerText = e.target.value;
    ch_boost = true;
    boost = Number(e.target.value);
    console.log("boost", boost)
}

// -----------------  BOOOOST  END -------------------
//canvas
ctx = canvas.getContext("2d");
// Arreglo de bolitas
let MC;
/*-------------------------------------------------------------------------------*/
/*-------------------------------Utilidades--------------------------------------*/
/*-------------------------------------------------------------------------------*/
function distancia(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
} 

Number.prototype.entre = function (c1,c2){
    var min = Math.min.apply(Math, [c1,c2]);
    var max = Math.max.apply(Math, [c1,c2]);
    return this >= min && this <= max;
}

function rotar(vel,ang){
    const rotado = {
        x: vel.x * Math.cos(ang) - vel.y * Math.sin(ang),
        y: vel.x * Math.sin(ang) + vel.y * Math.cos(ang)
    }
    return rotado;
}

/*-------------------------------------------------------------------------------*/
/*---------------------------------Física----------------------------------------*/
/*-------------------------------------------------------------------------------*/
//function choque(particle, otherParticle) {
function choque(P1, P2) {
    //Prevenir superposición
    if ((P1.vx - P2.vx) * (P2.x - P1.x) + (P1.vy - P2.vy) * (P2.y - P1.y) >= 0) {
        //Determinar ángulo entre el eje x y la posición del punto de colisión
        const angle = -Math.atan2(P2.y - P1.y, P2.x - P1.x);
        // Masas de las partículas
        const m1 = P1.m;
        const m2 = P2.m;
        // Vector velocidad de cada partícula en coordenadas cartesianas
        const vel1 ={x: P1.vx, y: P1.vy};
        const vel2 ={x: P2.vx,y: P2.vy};
        // Rotar sistema hasta dejarlo paralelo al eje x
        const u1 = rotar(vel1, angle);
        const u2 = rotar(vel2, angle);
        // Colisión elástica unidimensional
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
        // Restaurar sistema rotándolo a su ángulo original
        const vFinal1 = rotar(v1, -angle);
        const vFinal2 = rotar(v2, -angle);
        // Actualización de las velocidades de las partículas
        P1.vx = vFinal1.x;
        P1.vy = vFinal1.y;
        P2.vx = vFinal2.x;
        P2.vy = vFinal2.y;
    }
}

/*-------------------------------------------------------------------------------*/
window.addEventListener('change', inicializar); // MAGIA!!!!!!!!!!

function inicializar(){ 
    MC = [];
    ctx.lineWidth = strk;  
    for (var i = 0; i < NB; i++) {
        let vx = (Math.random() - 0.5) * boost; 
        let vy = (Math.random() - 0.5) * boost;
        let x = Math.random() * (canvas.width - 2 * (r + strk)) + r + strk;
        let y = Math.random() * (canvas.height - 2 * (r + strk)) + r + strk;
        if (i != 0){
            for (var j = 0; j < MC.length; j++){
                if ((distancia(x, y, MC[j].x, MC[j].y) - 2 * (r + strk) <= 0) ||
                ((!(y.entre(ap + r + strk, canvas.height - ap - r - strk))) &&
                (x.entre(((canvas.width - ancho) / 2) - r - strk, ((canvas.width + ancho) / 2) + r + 2 * strk)))){
                    x = Math.random() * (canvas.width - 2 * (r + strk)) + r + strk;
                    y = Math.random() * (canvas.height - 2 * (r + strk)) + r + strk;
                    j = -1;
                }
            }
        } 
        MC.push(new Bolita(x,y,r,vx,vy,m));
    }
    ch_boost = true;
    borde();
    
}

/*-------------------------------------------------------------------------------*/
/*---------------------------------Formas----------------------------------------*/
/*-------------------------------------------------------------------------------*/
function borde() {
    ED = [];
    ctx.beginPath();
    ctx.lineWidth = strk;
    ctx.strokeStyle = "rgba(25,25,25,1)";  
    ctx.moveTo((canvas.width - ancho)/2,0);
    ctx.lineTo((canvas.width - ancho)/2,ap);
    ctx.lineTo((canvas.width + ancho)/2,ap);
    ctx.lineTo((canvas.width + ancho)/2,0);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(50,50,50,1)";
    ctx.fill();  
    ctx.beginPath();
    ctx.moveTo((canvas.width - ancho)/2,canvas.height);
    ctx.lineTo((canvas.width - ancho)/2,canvas.height - ap);
    ctx.lineTo((canvas.width + ancho)/2,canvas.height - ap);
    ctx.lineTo((canvas.width + ancho)/2,canvas.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(50,50,50,1)";
    ctx.fill(); 
}

function Bolita(x,y,r,vx,vy,m){
    this.m = m;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;

    this.draw = function(){
        var vel = Number(Math.abs(Math.round(55*Math.sqrt(Math.pow(this.vx,2)+Math.pow(this.vy,2)))));
        var grd = ctx.createRadialGradient(this.x, this.y, Number(Math.round(this.r/10)), this.x, this.y, this.r);
        grd.addColorStop(0, "rgba("+Number(60 + vel)+","+Number(60 + vel)+","+Number(80 + vel)+",1)");
        grd.addColorStop(1, "rgba("+Number(30 - vel)+","+Number(30 - vel)+","+Number(50 - vel)+",1)");
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI,false);
        ctx.closePath();
        ctx.strokeStyle = "rgba("+Number(30 - vel)+","+Number(30 - vel)+","+Number(50 - vel)+",1)";
        ctx.fillStyle = grd;
        ctx.stroke();
        ctx.fill(); 
    }
    this.update = function(MC){
        for (var k = 0; k < MC.length; k++){
            if ((distancia(this.x,this.y,MC[k].x,MC[k].y) - (MC[k].r + this.r)) <= 0 && this != MC[k]){
                choque(this,MC[k]);
            } 
        }   
        if (!(this.x.entre(this.r + strk, canvas.width - this.r - strk))){
            //Prevenir superposición
            if (((this.vx * (this.x - this.r - strk)) >= 0) || (this.vx * (canvas.width - this.r - this.x - strk) <= 0)) {
                this.vx *= -1;            
            }
        }
        if (!(this.y.entre(this.r + strk, canvas.height - this.r - strk))){
            //Prevenir superposición
            if (((this.vy * (this.y - this.r - strk)) >= 0) || (this.vy * (canvas.height - this.r - this.y - strk) <= 0)) {
                this.vy *= -1;
            } 
        }
        //Bordes de las paredes
        if (this.x.entre(((canvas.width - ancho) / 2) - this.r - strk, ((canvas.width + ancho) / 2) + this.r + strk)){
            if (!(this.y.entre(ap + strk, canvas.height - ap - strk))){
                //Prevenir superposición: (Izquierda || Derecha)
                if ((this.vx * (((canvas.width - ancho) / 2) - this.x - this.r - strk) <= 0) || 
                (this.vx * ((((canvas.width + ancho) / 2)) - this.x - this.r - strk) >= 0)){
                    this.vx *= -1;
                }
            }
            if (!(this.y.entre(ap, canvas.height - ap))){  
                //Prevenir superposición : (Arriba || Abajo)
                if ((this.vy * (this.y - this.r - ap) >= 0) ||
                (this.vy * (this.y + this.r - canvas.height + ap) >= 0)) {    
                    this.vy *= -1;
                    this.vx *= -1;
                } 
            }
        }
        //Choques entre partículas vecinas
        
        this.x += this.vx;
        this.y += this.vy;   
        this.draw();
    }
}

/*-------------------------------------------------------------------------------*/
/*---------------------------------Tiempo----------------------------------------*/
/*-------------------------------------------------------------------------------*/

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if ((MC.length === NB) && (ch_boost == true)){
        borde();
        for (var i = 0; i < MC.length; i++) {
            MC[i].update(MC);
        }
    } else {
        console.log("paso","Numero bolitas", NB, MC.length, ch_boost);
        inicializar()
    }
}
inicializar();
animar();

