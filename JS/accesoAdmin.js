// ---------------- HEADER ---------------------

document.querySelector("header").innerHTML = `
    <div class="logo">
    <img src="../IMAGENES/restoradar.png" alt="restoradar" />
    </div> 
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
      <button class="cerrar-menu" id="cerrar"><i class="bi bi-x-lg"></i></button>
      <ul class="nav-list">
        <li>
          <a href="../index.html" target="_blank">Inicio</a>
        </li>
      </ul>
    </nav>
`;

// ------------- HEADER TRANSPARENTE------------ //
var header = document.getElementById("myHeader");
var lastScrollTop = 0;

window.addEventListener("scroll", function () {
  var currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.classList.add("transparent-header");
  } else {
    header.classList.remove("transparent-header");
  }

  lastScrollTop = currentScroll;
});

// ------------- MENU HAMBURGUESA -------------- //

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});





// ---------------- FOOTER ----------------------------
document.querySelector("footer").innerHTML = `
<div class="logo-footer">
  <img src="../IMAGENES/restoradar.png" alt="restoradar" />
  </div>

<div class="social-icons">
        <p>Seguinos:</p>
        <a href="https://www.linkedin.com/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://www.facebook.com/" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.youtube.com/" target="_blank"><i class="fa-brands fa-youtube"></i></a>
      </div>
      <div class="contacto">
        <a href="mailto:restoradar@gmail.com" target="blank">Contacto: restoradar@gmail.com</a>
      </div>
      <div class="derechos">
        <p>
          Copyright &copy; 2024 - restoradar S.R.L. - Buenos Aires - Argentina
          - Todos los derechos reservados.
        </p>
      </div>
    </footer>`;

/* ------------- Realizar Filtros ------------- */

const { createApp } = Vue;

createApp({
  data() {
    return {
      url: "../JSON/oferta-gastronomica.geojson",
      datos: [],
      categoria: "Todos",
      cocina: "Todos",
      barrio: "Todos",
      categorias: [],
      cocinas: [],
      barrios: [],
      datosFiltrados: [],
      error: false,
    };
  },

  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.datos = data.features;
          this.extractUniqueValues();
          this.datosFiltrados = this.datos; // Inicializar datosFiltrados con todos los datos
          this.filtro(); // Aplicar automáticamente los filtros al cargar la página
        })
        .catch((error) => {
          console.log("Error:" + error);
          this.error = true;
        });
    },

    extractUniqueValues() {
      const categoriasSet = new Set();
      const cocinasSet = new Set();
      const barriosSet = new Set();

      this.datos.forEach((dato) => {
        categoriasSet.add(dato.properties.categoria);
        cocinasSet.add(dato.properties.cocina);
        barriosSet.add(dato.properties.barrio);
      });

      this.categorias = Array.from(categoriasSet);
      this.cocinas = Array.from(cocinasSet);
      this.barrios = Array.from(barriosSet);
    },

    filtro() {
      this.datosFiltrados = this.datos.filter((dato) =>
        (this.categoria === "Todos" || dato.properties.categoria === this.categoria) &&
        (this.cocina === "Todos" || dato.properties.cocina === this.cocina) &&
        (this.barrio === "Todos" || dato.properties.barrio === this.barrio)
      );
    },

    orden() {
      this.datos.sort((a, b) => (a.properties.nombre > b.properties.nombre ? 1 : -1));
    },
  },

  created() {
    this.fetchData(this.url);
  },

}).mount('#app');
