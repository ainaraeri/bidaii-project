const crypto = require('crypto');

// Genera una cadena aleatoria segura de la longitud especificada
function generateRandomToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Define y exporta tu clave secreta
const secretToken = generateRandomToken(64);

module.exports = {
  secretToken,
};
