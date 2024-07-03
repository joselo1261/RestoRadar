// Usando pdf-lib

const { createApp, nextTick } = Vue;

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
          this.datosFiltrados = this.datos;
          this.filtro();
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
      this.datosFiltrados = this.datos.filter(
        (dato) =>
          (this.categoria === "Todos" ||
            dato.properties.categoria === this.categoria) &&
          (this.cocina === "Todos" ||
            dato.properties.cocina === this.cocina) &&
          (this.barrio === "Todos" || dato.properties.barrio === this.barrio)
      );
    },

    async generarPDF() {
      const response = await fetch('/generate_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ datosFiltrados: this.datosFiltrados }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'listado_gastronomico_caba.pdf';
        link.click();
      } else {
        console.error('Error al generar PDF');
      }
    },
  },

  created() {
    this.fetchData(this.url);
  },
}).mount("#app");



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
        <a href="./accesoAdmin1.html">Administrador</a>
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