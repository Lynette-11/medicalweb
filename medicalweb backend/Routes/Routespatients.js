// Routes/Routerpatients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// POST /patients/register
router.post('/register', async (req, res) => {
  const { nom, email, motDePasse } = req.body;

  // Vérification des champs requis
  if (!nom || !email || !motDePasse) {
    return res.status(400).json({ message: "Tous les champs sont requis (nom, email, motDePasse)" });
  }

  try {
    // Vérifie si un patient existe déjà avec cet email
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(409).json({ message: "Un patient avec cet email existe déjà" });
    }

    // Création du patient
    const newPatient = new Patient({ nom, email, motDePasse });
    await newPatient.save();

    console.log("✅ Patient enregistré:", newPatient);
    res.status(201).json({ message: "Patient enregistré avec succès", patient: newPatient });
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement du patient:", err);
    res.status(500).json({
      message: "Erreur interne lors de l'enregistrement",
      error: err.message
    });
  }
});

 //get patient rendezvous by email
router.get('/:email/rendezvous', async (req, res) => {
  try {
    const rdvs = await RendezVous.find({ emailPatient: req.params.email }).populate('medecinId');
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});
router.get('/:email/rendezvous', async (req, res) => {
  try {
    const email = req.params.email;
    const rdvs = await RendezVous.find({ emailPatient: email }).populate('medecinId');

    const result = rdvs.map(rdv => ({
      jour: rdv.jour,
      heure: rdv.heure,
      diagnostic: rdv.diagnostic || 'En attente',
      medecin: rdv.medecinId ? rdv.medecinId.nom : 'Inconnu'
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});


module.exports = router;

