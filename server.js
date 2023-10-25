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
const { secretToken } = require('./src/components/auth/token'); 
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express(); 

const http = require('http');
const server = http.createServer(app);

app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:8080',
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

// Registro
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Realiza una validación básica, asegurándote de que los campos no estén vacíos y otros criterios que desees
    if (!email || !password) {
      return res.status(400).json({ message: 'Campos incompletos' });
    }

    // Aplica una política de contraseñas sólida, como longitud mínima y complejidad
    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña es demasiado corta' });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10); // El segundo parámetro es el "salting" (número de rondas de hashing)

    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = new User({
      email,
      password: hashedPassword,
    });


    // Guarda el usuario en la base de datos
    await newUser.save();

    res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});


// Endpoint para obtener información del usuario autenticado
app.get('/getAuthenticatedUser', (req, res) => {
  // Obtener el token JWT de la cabecera de autorización
  const token = req.headers.authorization.split(' ')[1];

  // Verificar el token
  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // El token es válido, puedes devolver información del usuario desde tu base de datos
    const userId = decoded.userId; // Supongamos que el token contiene el ID del usuario

    // Consultar la base de datos para obtener información del usuario
    const user = getUserDataFromDatabase(userId);

    res.json(user);
  });
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  console.log('Solicitud de inicio de sesión recibida');
  try {
    const { email, password } = req.body;
    // Busca el usuario en la base de datos por el correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico incorrecto' });
    }
    
    // Verifica la contraseña utilizando bcrypt.compare()
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // La contraseña coincide, genera el token y responde con éxito
      const token = jwt.sign({ userId: user._id }, secretToken, { expiresIn: '1h' });
      res.json({ token });
    } else {
      // La contraseña no coincide, responde con un estado 401
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
