const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  adresse: { type: String, required: true },
  jours: { type: String, required: true },
  horaires: { type: String, required: true },
  motDePasse: { type: String, required: true }, // nouveau champ
  emploiDuTemps: { type: Array, default: [] } // pour stocker les horaires
}, 
);

module.exports = mongoose.model('Medecin', medecinSchema);

