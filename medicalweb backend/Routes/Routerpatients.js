const express = require('express');
const router = express.Router();
const RendezVous = require('../models/rendezvous');
const Medecin = require('../models/Medecin');

// Liste des rendez-vous du patient avec le nom du médecin
router.get('/:email/rendezvous', async (req, res) => {
  try {
    const email = req.params.email;
    const rdvs = await RendezVous.find({ emailPatient: email }).populate('medecinId');

    const result = rdvs.map(rdv => ({
      jour: rdv.jour,
      heure: rdv.heure,
      diagnostic: rdv.diagnostic || "En attente",
      medecin: rdv.medecinId ? rdv.medecinId.nom : "Inconnu"
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;