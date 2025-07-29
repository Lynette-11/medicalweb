const express = require('express');
const router = express.Router();
const Medecin = require('../models/Medecin');

const bcrypt = require('bcrypt');

// POST /medecins
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.motDePasse, 10);
    const medecin = new Medecin({
      ...req.body,
      motDePasse: hashedPassword
    });
    await medecin.save();
    res.status(201).json(medecin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET /medecins/:id → Obtenir un médecin
router.get('/:id', async (req, res) => {
  try {
    const medecin = await Medecin.findById(req.params.id);
    if (!medecin) return res.status(404).json({ message: 'Médecin non trouvé' });
    res.json(medecin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /medecins/login
router.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const medecin = await Medecin.findOne({ email });
    if (!medecin) {
      return res.status(404).json({ message: "Médecin non trouvé" });
    }

    const isMatch = await bcrypt.compare(motDePasse, medecin.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({
      message: "Connexion réussie",
      medecinId: medecin._id,
      nom: medecin.nom,
      email: medecin.email,
      jours: medecin.jours,
      horaires: medecin.horaires
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /medecins/:id/planning
router.get('/medecins/:id/planning', async (req, res) => {
  const { id } = req.params;
  const medecin = await Medecin.findById(id);
  if (!medecin) return res.status(404).json({ error: 'Médecin introuvable' });

  // ici tu récupères les rendez-vous de la base (tu peux les simuler d’abord)
  const planning = [
    { jour: "Dimanche", heure: "09h00", patient: "Mme Lilia" },
    { jour: "Mardi", heure: "10h30", patient: "M. Amine" },
  ];

  res.json({
    nom: medecin.nom,
    jours: medecin.jours,
    horaires: medecin.horaires,
    planning
  });
});



module.exports = router;