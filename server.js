const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/users?retryWrites=true&w=majority";
const path = require('path');
const User = require('./src/components/models/user');
const cors = require('cors'); 
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secretToken } = require('./src/token'); 
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express(); 

const http = require('http');
const server = http.createServer(app);

app.use(cookieParser());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.options('/auth', cors(corsOptions));
app.use(express.static(path.join(__dirname, 'webpack/webpack/public'))); //NO TOCAR
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const morgan = require('morgan');
app.use(morgan('dev'));

// Crear un servidor HTTP y conectar la aplicación Express a él
const httpServer = http.createServer(app);

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js')); // NOTOCAR
});

// Ruta GET para obtener la lista de usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Esto consulta todos los usuarios en la base de datos
    res.json(users); // Responde con la lista de usuarios en formato JSON
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
  }
});

//Registro
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Campos incompletos' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña es demasiado corta' });
    }

    const newUser = new User({
      email,
      password, // Almacena la contraseña en texto claro en la base de datos
    });

    await newUser.save();

    res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

//Inicio sesión
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico incorrecto' });
    }

    if (password === user.password) {
      res.json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
});


// Inicia el servidor HTTP
const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

mongoose.connect(uri, {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Aumenta el tiempo de espera
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
