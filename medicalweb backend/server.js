// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Importer les routes
const rendezvousRoutes = require('./Routes/RoutesRendezVous');
const medecinRoutes = require('./Routes/RoutesMedecin');
const patientRoutes = require('./Routes/Routespatients');

// Utiliser les routes
app.use('/rendezvous', rendezvousRoutes);
app.use('/medecins', medecinRoutes);
app.use('/patients', patientRoutes);

// Test
app.get('/', (req, res) => {
  res.send('✅ Serveur API médical opérationnel');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
