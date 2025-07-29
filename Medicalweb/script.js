// Make sure Swiper is loaded before this script, e.g. via <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
const swiper = new Swiper(".mySwiper", {
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0:{
      slidesPerView: 1,
    },
    768:{
      slidesPerView: 2,
    },
    1024:{
      slidesPerView: 3,
    }}
});
const form = document.querySelector('#registerForm');
if (form) {
  form.addEventListener('submit', function(e) {
    const username = form.querySelector('[name="username"]');
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');
    const fonenumber = form.querySelector('[name="fonenumber"]');
    let valid = true;
    let messages = [];

    if (!username.value.trim()) {
      valid = false;
      messages.push("Le nom d'utilisateur est requis.");
    }
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
      valid = false;
      messages.push("L'adresse e-mail est invalide.");
    }
    if (!password.value || password.value.length < 6) {
      valid = false;
      messages.push("Le mot de passe doit contenir au moins 6 caractères.");
    }
    if (!fonenumber.value.trim() || !/^\d{10}$/.test(fonenumber.value)) {
      valid = false;
      messages.push("Le numéro de téléphone doit contenir 10 chiffres.");
    }

    if (!valid) {
      e.preventDefault();
      alert(messages.join('\n'));
    }
  });
}
const appointmentForm = document.querySelector('#appointmentForm');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire si besoin
    alert("Votre rendez-vous a été pris avec succès !");
    appointmentForm.reset();
  });
}
// Show confirmation when clicking on "Prendre un rendez-vous"
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");

  if (button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmRedirect = confirm("Souhaitez-vous prendre un rendez-vous ?");
      if (confirmRedirect) {
        window.location.href = "rendezvous.html";
      }
    });
  }
});
 
// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll("nav ul li a");
//   const currentPage = window.location.pathname.split("/").pop();

//   links.forEach(link => {
//     if (link.getAttribute("href") === currentPage) {
//       link.style.color = "#2e86de"; // active color
//       link.style.fontWeight = "bold";
//     }
//   });
// });
// Scroll reveal effect for sections
const revealElements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.9;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
});

    // const doctorLoginForm = document.getElementById("doctorLoginForm");
    // if (doctorLoginForm) {
    //   doctorLoginForm.addEventListener("submit", function (e) {
    //     e.preventDefault();

    //     const name = document.getElementById("loginName").value;
    //     const password = document.getElementById("loginPassword").value;

    //     const storedDoctor = JSON.parse(localStorage.getItem(name));

    //     if (storedDoctor && storedDoctor.password === password) {
    //       sessionStorage.setItem("connectedDoctor", name);
    //       window.location.href = "dashboard.html";
    //     } else {
    //       alert("Identifiants incorrects !");
    //     }
    //   });
    // }

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