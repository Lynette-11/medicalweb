// models/Patient.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  telephone: String,
  dateNaissance: Date,
  genre: { type: String, enum: ['Homme', 'Femme'] },
  dateInscription: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
