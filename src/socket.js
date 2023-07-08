module.exports = (io) => {
    var data = [];
    var usuarios = 0;
  
    io.on('connection', (socket) => {
      for (let i = 0; i < data.length; i++) {
        socket.emit('showDibujo', data[i]);
      }

      usuarios += 1;
      io.emit('usuarios', usuarios); 

      socket.on('borrar', ()=>{
        data = [];
        io.emit('showDibujo', null)
      });

      socket.on('dibujar', (dibujo) => {
        data.push(dibujo);
        io.emit('showDibujo', dibujo);
      });

      socket.on('disconnect', ()=>{
        usuarios -= 1;
        io.emit('usuarios', usuarios); 
      })
    });
  };
  