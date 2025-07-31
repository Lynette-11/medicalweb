document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registerForm');
});

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
    // ajouter la logique d'envoi du formulaire si besoin
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
 
  
// add a review
  const form = document.getElementById("review-form");
  const list = document.getElementById("review-list");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("review-text").value.trim();
    const name = document.getElementById("review-name").value.trim();

    if (text && name) {
      const newReview = document.createElement("div");
      newReview.classList.add("review");
      newReview.innerHTML = `<p>"${text}"</p><span>— ${name}</span>`;
      list.appendChild(newReview);
      form.reset();
    }
  });

    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

function confirmRendezVous() {
  const confirmRDV = confirm("Êtes-vous sûre de vouloir prendre ce rendez-vous ?");
  if (confirmRDV) {
    window.location.href = "rendezvous.html";
  }
}



