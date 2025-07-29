const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Créer l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Import des routes
const rendezvousRoutes = require('./Routes/RoutesRendezVous');
const medecinRoutes = require('./Routes/RoutesMedecin');
const patientRoutes = require('./Routes/Routerpatients');

// Utilisation des routes
app.use('/rendezvous', rendezvousRoutes);
app.use('/medecins', medecinRoutes);
app.use('/patients', patientRoutes);

// Route de test simple
app.get('/', (req, res) => {
  res.send('✅ Serveur API médical opérationnel');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});

router.post('/', async (req, res) => {
  // ...
});
module.exports = router;