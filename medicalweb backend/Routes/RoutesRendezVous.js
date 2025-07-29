const express = require('express');
const router = express.Router();
const RendezVous = require('../models/RendezVous');

// ✅ POST: Créer un nouveau rendez-vous
router.post('/', async (req, res) => {
  const { medecinId, jour, heure, nomPatient, emailPatient } = req.body;

  // 🔍 Vérification des champs obligatoires
  if (!medecinId || !jour || !heure || !nomPatient || !emailPatient) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // 🧠 Création du rendez-vous
    const nouveauRDV = new RendezVous({
      medecinId,
      jour,
      heure,
      nomPatient,
      emailPatient,
      diagnostic: "En attente" // valeur par défaut
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

// ✅ GET : Liste vide (à améliorer plus tard)
router.get('/patient/:email', async (req, res) => {
  try {
    const rdvs = await RendezVous.find({ emailPatient: req.params.email }).populate('medecinId');
    res.json(rdvs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});


module.exports = router;

