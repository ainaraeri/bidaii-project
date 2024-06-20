

const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'webpack/webpack/public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/bootstrap.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'webpack/public/js/bootstrap.js'));
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});