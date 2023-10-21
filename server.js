const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');

const app = express(); 

app.use(express.static(path.join(__dirname, 'webpack/webpack/public'))); //NO TOCAR

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js')); // NOTOCAR
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
