"strict mode";

import { IMG_API_KEY } from "./apikeys.js"; // importera apinyckel från annan jsfil

window.addEventListener("load", function () {
  const dashboard_name = document.getElementById("dashboard-name");

  // Spara dashboard name till localstorage
  dashboard_name.addEventListener("input", () => {
    const currentText = dashboard_name.innerText;
    localStorage.setItem("dashboardName", currentText);
  });

  // Hämta dashboard name från localstorage om det finns sparat
  window.addEventListener("load", () => {
    const savedName = localStorage.getItem("dashboardName");
    if (savedName) {
      dashboard_name.innerText = savedName;
    }
  });

  // -------------------------------------------------//

  // Genrera random bild direkt när sidan laddas
  getBackgroundImage();

  // Knapp för att slumpa fram bakgrundsbild
  const generateBackground = document.querySelector(".get-image");

  generateBackground.addEventListener("click", () => {
    getBackgroundImage();
  });

  // Funktion för att hämta random bakgrundsbild från Unsplash
  async function getBackgroundImage() {
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${IMG_API_KEY}&orientation=landscape&topics=natue&query=sky,forest,flower`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${data.urls.full})`;

    // Lägg till photcredits
    const photoCredit = document.querySelector(".photo-credits");
    photoCredit.innerHTML = `
      <p>Photographer: ${data.user.name}</p>
      <p> ${data.alt_description}</p>
      <a href="${data.user.links.html}" target="_blank">Unsplash</a>`;
  }
});
