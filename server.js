const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ainaraerice:mioasisdepaz@cluster0.djlqrpw.mongodb.net/?retryWrites=true&w=majority";

const app = express(); // Define 'app' como una instancia de Express

app.use(express.static('static'));

app.get('/bootstrap.js', (req, res) => {
  res.type('text/javascript'); // Establece el tipo MIME a JavaScript
  res.sendFile(path.join(__dirname, 'public/js/bootstrap.js'));
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
