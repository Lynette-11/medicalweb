const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  medecinId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medecin', required: true },
  jour: { type: String, required: true },
  heure: { type: String, required: true },
  nomPatient: { type: String, required: true },
  emailPatient: { type: String, required: true }
});

// Correction : évite l’erreur d’overwrite
module.exports = mongoose.models.RendezVous || mongoose.model('RendezVous', rendezVousSchema);
