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

/* ------------- Realizar Filtros ------------- */

const { createApp } = Vue;

createApp({
  data() {
    return {
      //url:"https://user1261.pythonanywhere.com/restaurantes",
      url: "../JSON/restaurantes.json",
      datos: [],
      cocina: "Todos",
      barrio: "Todos",
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
          console.log("Datos obtenidos:", data);
          if (data && data.restaurantes && Array.isArray(data.restaurantes)) {
            this.datos = data.restaurantes;
            this.extractUniqueValues();
            this.datosFiltrados = this.datos;
          } else {
            console.error("Estructura de datos no válida:", data);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          this.error = true;
        });
    },

    extractUniqueValues() {
      const cocinasSet = new Set();
      const barriosSet = new Set();

      if (Array.isArray(this.datos)) {
        this.datos.forEach((dato) => {
          if (Array.isArray(dato.cocina)) {
            dato.cocina.forEach((c) => cocinasSet.add(c));
          } else {
            cocinasSet.add(dato.cocina);
          }
          barriosSet.add(dato.barrio);
        });
      } else {
        console.error("Los datos no son un arreglo:", this.datos);
      }

      this.cocinas = Array.from(cocinasSet);
      this.barrios = Array.from(barriosSet);
    },

    filtro() {
      this.datosFiltrados = this.datos.filter(
        (dato) =>
          (this.cocina === "Todos" ||
            (Array.isArray(dato.cocina) && dato.cocina.includes(this.cocina)) ||
            dato.cocina === this.cocina) &&
          (this.barrio === "Todos" || dato.barrio === this.barrio)
      );
      console.log("Llamando a ordenar()");
      this.ordenar();
    },

    ordenar() {
      console.log("Datos filtrados:", this.datosFiltrados);
      this.datosFiltrados.sort((a, b) => {
        const comparison = a.name > b.name ? 1 : -1;
        console.log("Comparación:", comparison);
        return comparison;
      });
    },
  },
  
    created() {
    this.fetchData(this.url);
    },

}).mount('#app');
