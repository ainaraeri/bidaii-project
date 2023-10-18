const express = require('express');
const mongoose = require('mongoose');
const { run } = require('../mongo-connect'); 


const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

// Conecta a MongoDB
mongoose.connect('mongodb://localhost:27017/tu-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
  
  // Llama a la función run para conectar a MongoDB Atlas u otra base de datos
  run().then(() => {
    console.log('Conexión exitosa a la base de datos externa');
  }).catch(error => {
    console.error('Error al conectar a MongoDB:', error);
  });
});

async function run() {
  try {
    console.log('Intentando conectar a MongoDB...');
    // Resto del código ...
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error; // Para propagar el error y manejarlo en la llamada a run
  }
}

// Sirve los archivos estáticos desde la carpeta 'dist'
app.use(express.static(__dirname + '/dist/'));

// Ruta para todas las URLs; sirve el index.html
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});