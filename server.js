const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI||"ainaraerice:<password>@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";

const port = process.env.PORT || 8080;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Maneja los eventos de conexión y error
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
  // Aquí puedes inicializar y configurar tu aplicación Express
  app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001');
  });
});
