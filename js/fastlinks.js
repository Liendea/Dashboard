"strict mode";

window.addEventListener("load", function () {
  // 1. Hämta input
  // 2. Skapa snabblänk + faivcon
  // 3. Spara snabblänk i localstorage
  // 4. Lägg till funktion att hämta från localstorage
  // 5. Lägg till funktion att ta bort snabblänk och radera från localstorage
  // 6. Lägg till funktion att byta namn på länken

  // 1. Hämta input
  const link_search = document.querySelector(".link-search");

  link_search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let input = link_search.value.trim();
      let encodedURL = `https://${input}`;
      const faviconURL = `https://icons.duckduckgo.com/ip2/${input}.ico`;

      if (input) {
        createFastlink(encodedURL, input, faviconURL);
      }
    }
  });

  // 2. Skapa snabblänk i widget
  function createFastlink(encodedURL, input, faviconURL) {
    const fast_links = document.querySelector(".link-container"); // Container
    const link = document.createElement("div"); // skapa snabblänks kort

    link.classList.add("link");
    link.innerHTML = `
        <img src="${faviconURL}"  alt="logo" width="40" />
     
        <a href="${encodedURL}" class="fastlink" target="_blank" contenteditable="false">${input} </a>
        <div class="remove_button">
        <i class="fa-solid fa-circle-minus" style="color: #c0c0c0"></i>
        </div>
        `;

    fast_links.appendChild(link);

    saveLinkToLocalStorage(encodedURL, input, faviconURL); // Spara länken till localstorage

    // Ta bort knapp
    const remove_button = link.querySelector(".remove_button");
    remove_button.addEventListener("click", () => {
      removeFastLink(link);
      removeLinkFromLocalStorage(encodedURL); // Ta bort från local storage
    });

    link_search.value = "";
  }

  // -------------------------------------------------- //

  // 3. Spara till local storage
  function saveLinkToLocalStorage(url, name, faviconURL) {
    const links = JSON.parse(localStorage.getItem("fastLinks")) || [];

    // Kolla om länken redan finns
    const linkExists = links.some((link) => link.url === url);

    // Om länken inte redan finns, lägg till i localstorage
    if (!linkExists) {
      links.push({ url, name, faviconURL });
      localStorage.setItem("fastLinks", JSON.stringify(links));
    }
  }

  // -------------------------------------------------- //

  // 4. Ladda snabblänkar från localStorage när sidan laddas

  const links = JSON.parse(localStorage.getItem("fastLinks")) || [];
  links.forEach((link) => createFastlink(link.url, link.name, link.faviconURL));

  // -------------------------------------------------- //

  // 5. a ) Funktion för att radera snabblänkar
  function removeFastLink(link) {
    link.remove();
  }

  // 5. b)  Ta bort från localStorage
  function removeLinkFromLocalStorage(url) {
    const links = JSON.parse(localStorage.getItem("fastLinks")) || [];
    const updatedLinks = links.filter((link) => link.url !== url);
    localStorage.setItem("fastLinks", JSON.stringify(updatedLinks));
  }

  // -------------------------------------------------- //

  // 6. Eeditera namn på snabblänkar

  const edit_button = document.querySelector(".edit-button");
  const check_button = document.querySelector(".check-button");

  // När edit knappen klickas ska det vara möjligt att redigera titel på snabblänk
  edit_button.addEventListener("click", () => {
    check_button.classList.toggle("hidden");
    edit_button.classList.toggle("hidden");

    if (edit_button.classList.contains("hidden")) {
      // Gör länkar redigerbara
      const fastlink = document.querySelectorAll(".link a");
      fastlink.forEach((link) => {
        link.setAttribute("contenteditable", "true");
        link.style.color = "darkgray";
      });
    } else {
      // Avsluta redigering på alla länkar
      const fastLinks = document.querySelectorAll(".link a");
      fastLinks.forEach((link) => {
        link.setAttribute("contenteditable", "false");
        link.style.color = "black";

        // När användaren slutar redigera, uppdatera localStorage med det nya namnet
        const newName = link.textContent.trim();
        updateLinkInLocalStorage(link.href, newName);
      });
    }
  });

  // När check knappen klcikas ska redigeringsläget avslutar
  check_button.addEventListener("click", () => {
    check_button.classList.toggle("hidden");
    edit_button.classList.toggle("hidden");

    // Avsluta redigering på alla länkar
    const fastLinks = document.querySelectorAll(".link a");
    fastLinks.forEach((link) => {
      link.setAttribute("contenteditable", "false");
      link.style.color = "black";

      // När användaren slutar redigera, uppdatera localStorage med det nya namnet
      const newName = link.textContent.trim();
      const linkUrl = link.getAttribute("href");
      updateLinkInLocalStorage(linkUrl, newName);
    });
  });

  // Funktion för att uppdatera länken i localStorage med det nya namnet
  function updateLinkInLocalStorage(url, newName) {
    const links = JSON.parse(localStorage.getItem("fastLinks")) || [];

    // Hitta länken och uppdatera namnet
    const updatedLinks = links.map((link) => {
      if (link.url === url) {
        link.name = newName;
      }
      return link;
    });

    // Spara tillbaka till localStorage
    localStorage.setItem("fastLinks", JSON.stringify(updatedLinks));
  }
});
