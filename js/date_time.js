"strict mode";

window.addEventListener("load", function () {
  const date = document.querySelector(".date");
  const time = document.querySelector(".time");

  function updateClock() {
    const now = new Date(); // hämta nuvarande tid
    const hours = String(now.getHours()).padStart(2, "0"); // Hämta timmar och format till två siffror
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Hämta minuter och format till två siffror

    const options = { year: "numeric", month: "long", day: "numeric" };
    const currentDate = now.toLocaleDateString("sv-SE", options); // Hämtar datumet i svensk format (YYYY-MM-DD)

    date.innerHTML = `${currentDate}`;
    time.innerHTML = `${hours} : ${minutes}`;

    // Uppdatera klockan varje minut (60000 ms = 1 minut)
    setInterval(updateClock, 60000);
  }

  // Kör en gång direkt när sidan laddas för att visa tiden omedelbart
  updateClock();
});
