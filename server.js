const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
const bodyParser = require('body-parser');

const app = express(); 

app.use(express.static(path.join(__dirname, 'webpack/webpack/public'))); //NO TOCAR
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js')); // NOTOCAR
});


app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Realiza validaciones de correo y contraseña aquí.

  // Crea un nuevo usuario y guárdalo en la base de datos.
  const User = require('./models/user'); // Asegúrate de tener un modelo de usuario definido.

  const newUser = new User({
    email,
    password,
  });

  newUser.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error al registrar el usuario' });
    } else {
      res.status(200).json({ message: 'Usuario registrado con éxito' });
    }
  });
});

// Inicia el servidor.
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
