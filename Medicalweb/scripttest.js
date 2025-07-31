  const medecinId = localStorage.getItem("medecinId"); // stocké après connexion

fetch(`http://localhost:3000/medecins/${medecinId}/planning`)
  .then(res => res.json())
  .then(data => {
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi"];
    const heures = ["09h00", "09h30", "10h00", "10h30", "11h00", "11h30", "12h00", "13h00", "14h00", "15h00", "16h00"];

    const planning = {};

    for (let h of heures) {
      planning[h] = {};
      for (let j of jours) {
        planning[h][j] = "";
      }
    }

    for (let rdv of data.planning) {
      planning[rdv.heure][rdv.jour] = rdv.patient;
    }

    const table = document.createElement("table");
    let html = "<tr><th>Heure</th>";
    for (let j of jours) html += `<th>${j}</th>`;
    html += "</tr>";

    for (let h of heures) {
      html += `<tr><td>${h}</td>`;
      for (let j of jours) {
        html += `<td>${planning[h][j]}</td>`;
      }
      html += "</tr>";
    }

    table.innerHTML = html;
    document.getElementById("emploi-du-temps").appendChild(table);
  })
  .catch(err => console.error("Erreur :", err));
  // Formulaire rendez-vous
  document.getElementById("formRdv").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    medecinId: document.getElementById("medecinId").value,
    jour: document.getElementById("jour").value,
    heure: document.getElementById("heure").value,
    nomPatient: document.getElementById("nomPatient").value,
    emailPatient: document.getElementById("emailPatient").value
  };

  fetch("http://localhost:3000/rendezvous", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(msg => alert(msg.message))
  .catch(err => console.error(err));
});
const email = "fatima@example.com"; // Email du patient connecté

fetch(`http://localhost:3000/patients/${email}/rendezvous`)
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("rdvList");
    data.forEach(rdv => {
      const li = document.createElement("li");
      li.textContent = `${rdv.jour} à ${rdv.heure} avec Dr. ${rdv.medecin} — Diagnostic : ${rdv.diagnostic}`;
      ul.appendChild(li);
    });
  })
  //link yhe back and front//
  .catch(err => console.error("Erreur fetch :", err));

fetch("http://localhost:3000/medecins")
  .then(res => res.json())
  .then(data => {
    const ul = document.getElementById("liste");
    data.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.nom;
      ul.appendChild(li);
    });
  })
  .catch(err => console.error("Erreur :", err));

fetch(`http://localhost:3000/patients/${email}/rendezvous`)
  .then(res => res.json())
  .then(data => {
    data.forEach(rdv => {
      console.log(`${rdv.jour} à ${rdv.heure} — ${rdv.diagnostic}`);
    });
  })
  .catch(err => console.error("Erreur :", err));  