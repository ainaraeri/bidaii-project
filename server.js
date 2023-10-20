const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');

const app = express(); 
const express = require('express');

app.use(express.static(path.join(__dirname, 'webpack/public/js')));

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript'); // Establece el tipo MIME
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js'));
});

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
