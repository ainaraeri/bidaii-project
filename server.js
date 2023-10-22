const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/users?retryWrites=true&w=majority";
const path = require('path');
const User = require('./src/components/models/user');
const cors = require('cors'); 
const client = new MongoClient(uri);

const app = express(); 

const corsOptions = {
  origin: 'http://bidaii-project2-f71c13b6eccf.herokuapp.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.options('/register', cors(corsOptions));
app.use(express.static(path.join(__dirname, 'webpack/webpack/public'))); //NO TOCAR
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const morgan = require('morgan');
app.use(morgan('dev'));


app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js')); // NOTOCAR
});

//Registro
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Datos de entrada:', email, password);
    // Realiza validaciones de correo y contraseña aquí.
    // Crea un nuevo usuario y guárdalo en la base de datos.
    const newUser = new User({
      email,
      password,
    });
    // Agregar un registro para verificar que se llegó a esta parte del código
    console.log('Antes de guardar en la base de datos');
    await newUser.save();

    // Agregar un registro para verificar que se completó el guardado
    console.log('Después de guardar en la base de datos');
    res.status(200).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    // Agregar un registro para ver los errores
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

  
// Inicia el servidor.
const port = process.env.PORT || 8080;
app.listen(port, () => {
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

// Utiliza CORS con opciones personalizadas
app.use(cors());

run().catch(console.dir);
