const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./src/components/models/user');
const cors = require('cors'); 

const app = express(); 

app.use(cors());


app.use(express.static(path.join(__dirname, 'webpack/webpack/public'))); //NO TOCAR
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js')); // NOTOCAR
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Agregar un registro para verificar los datos de entrada
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

// Configuración avanzada de CORS
const corsOptions = {
  origin: 'https://bidaii-project2-f71c13b6eccf.herokuapp.com/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

// Utiliza CORS con opciones personalizadas
app.use(cors(corsOptions));

run().catch(console.dir);
