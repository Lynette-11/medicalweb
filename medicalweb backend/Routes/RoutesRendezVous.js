const express = require('express');
const router = express.Router();
const RendezVous = require('../models/RendezVous');
const Medecin = require('../models/Medecin');
const Patient = require('../models/Patient');

// Créer un nouveau rendez-vous
router.post('/', async (req, res) => {
  const { medecinId, jour, heure, nomPatient, emailPatient } = req.body;

  // Champs obligatoires
  if (!medecinId || !jour || !heure || !nomPatient || !emailPatient) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    //  Création du rendez-vous
    const nouveauRDV = new RendezVous({
      medecinId,
      jour,
      heure,
      nomPatient,
      emailPatient,
      diagnostic: "En attente" ,

    });

    await nouveauRDV.save();

    res.status(201).json({
      message: 'Rendez-vous enregistré',
      rdv: nouveauRDV
    });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la création du rendez-vous',
      error: err.message
    });
  }
});




module.exports = router;

