const socket = io();
var click = false;
var posicionX = 0;
var posicionY = 0;
var posicionAnterior = null;
var moviendoMouse = false;
var color = 'forestgreen';

const ususarios = document.getElementById('usuarios');
const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.addEventListener('mousedown', () => {
  click = true;
});

canvas.addEventListener('mouseup', () => {
  click = false;
});

canvas.addEventListener('mousemove', (e) => {
  posicionX = e.clientX;
  posicionY = e.clientY;
  moviendoMouse = true;
});

function cambiarColor(c){
  color = c;
  contexto.strokeStyle = color;
  contexto.stroke();
}

function borrarTodo(){
  socket.emit('borrar')
}

function crearDibujo() {
  if (click && moviendoMouse && posicionAnterior != null) {
    let dibujo = {
      x: posicionX,
      y: posicionY,
      color: color,
      anterior: posicionAnterior,
    };

    socket.emit('dibujar', dibujo);
    showDibujo(dibujo);
  }

  posicionAnterior = {
    x: posicionX,
    y: posicionY,
  };

  setTimeout(crearDibujo, 25);
}

crearDibujo(); // Iniciar el proceso de dibujo

socket.on('showDibujo', (dibujo) => {
  if(dibujo != null){
    showDibujo(dibujo);
  }else {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
  }
});

function showDibujo(dibujo) {
    contexto.beginPath();
    contexto.lineWidth = 3;
    contexto.strokeStyle = dibujo.color;
    contexto.moveTo(dibujo.x, dibujo.y);
    contexto.lineTo(dibujo.anterior.x, dibujo.anterior.y);
    contexto.stroke();
}

socket.on('usuarios', (n)=>{
  ususarios.innerHTML = `Número de usuarios conectados ${n}`;
})

