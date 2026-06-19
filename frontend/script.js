document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("theme-styles")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles.css";
    link.id = "theme-styles";
    document.head.appendChild(link);
  }

  const paginaSelect = document.getElementById("pagina");
  const btnPersonajes = document.getElementById("btn-personajes");
  const btnPlanetas = document.getElementById("btn-planetas");
  const resultado = document.getElementById("resultado");

  for (let i = 1; i <= 7; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    paginaSelect.appendChild(option);
  }

  paginaSelect.addEventListener("change", (e) => {
    apiRickandMortyLocation(e.target.value);
  });

  btnPersonajes.addEventListener("click", () => {
    setActiveView("personajes");
  });

  btnPlanetas.addEventListener("click", () => {
    setActiveView("planetas");
  });

  setActiveView("planetas");
});

const dbzApiUrls = [
    "https://dragonball-api.com/api/characters"
  ];

const setActiveView = (view) => {
  const btnPersonajes = document.getElementById("btn-personajes");
  const btnPlanetas = document.getElementById("btn-planetas");
  const paginaSelect = document.getElementById("pagina");
  const container = paginaSelect.closest(".col-6");

  btnPersonajes.classList.toggle("active", view === "personajes");
  btnPlanetas.classList.toggle("active", view === "planetas");

  if (view === "personajes") {
    container.style.display = "none";
    loadDbzCharacters();
  } else {
    container.style.display = "block";
    apiRickandMortyLocation(document.getElementById("pagina").value || 1);
  }
};

const loadDbzCharacters = async () => {
  const divRes = document.querySelector("#resultado");
  divRes.innerHTML = "";
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Cargando personajes de Dragon Ball Z...";
  divRes.appendChild(errorMessage);

  for (const URL of dbzApiUrls) {
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const results = Array.isArray(data) ? data : data.results || data.characters || [];

      if (!results.length) continue;

      divRes.innerHTML = "";
      results.forEach((item) => {
        const divItem = document.createElement("div");
        divItem.className = "card";
        const name = item.name || item.character || "Sin nombre";
        const gender = item.gender || item.sex || item.Gender || "Desconocido";
        const faseta = item.fase || item.phase || item.stage || item.race || item.species || item.type || item.category || "Desconocido";
        const image = item.image || item.img || item.avatar || item.imageUrl || "";

        divItem.innerHTML = `
          ${image ? `<img src="${image}" alt="${name}" />` : ""}
          <div class="card-body">
            <h2>${name}</h2>
            <p>Género: ${gender}</p>
            <p>Faseta: ${faseta}</p>
          </div>
        `;
        divRes.appendChild(divItem);
      });
      return;
    } catch (error) {
      console.warn(`Fallo con ${URL}:`, error);
    }
  }

  divRes.innerHTML = "";
  const fail = document.createElement("p");
  fail.textContent = "No se pudo cargar la API de Dragon Ball Z. Intenta nuevamente más tarde.";
  divRes.appendChild(fail);
};

const apiRickandMortyLocation = async (pagina) => {
  const URL = `https://rickandmortyapi.com/api/location?page=${pagina}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = "";
    data.results.forEach((item) => {
      const divItem = document.createElement("div");
      divItem.className = "card";
      divItem.innerHTML = `
        <div class="card-body">
          <h2>${item.name}</h2>
          <p>Tipo: ${item.type || "Desconocido"}</p>
          <p>Dimensión: ${item.dimension || "Desconocido"}</p>
        </div>
      `;
      divRes.appendChild(divItem);
    });
  } catch (error) {
    console.error("ERROR:", error);
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = "<p>No se pudo cargar los planetas de Rick and Morty.</p>";
  }
};
