// ---------------- HEADER ---------------------  //

document.querySelector("header").innerHTML = `
    <div class="logo">
    <img src="../IMAGENES/restoradar.png" alt="restoradar" />
    </div> 
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
      <button class="cerrar-menu" id="cerrar"><i class="bi bi-x-lg"></i></button>
      <ul class="nav-list">
        <li>
          <a href="../index.html">Inicio</a>
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

// ---------------- FOOTER ------------------------- //
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

// ------------- Realizar Filtros ------------- //
const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      // url: "../JSON/restaurantes.json", // => Para usar Json local
      url:"https://user1261.pythonanywhere.com/restaurantes", // => Para usar con Json de pythonanywhere

      datos: [],
      cocina: "Todos",
      cocinas: [],
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
          // if (data && data.restaurantes && Array.isArray(data.restaurantes)) { // => Para usar Json local
          if (Array.isArray(data)) { // => Para usar con Json de pythonanywhere
            // this.datos = data.restaurantes; // => Para usar Json local
            this.datos = data; // => Para usar con Json de pythonanywhere
            this.extractUniqueValues();
          } else {
            console.error("Estructura de datos no válida:", data);
            this.error = true;
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          this.error = true;
        });
    },

    extractUniqueValues() {
      const cocinasSet = new Set();

      if (Array.isArray(this.datos)) {
        this.datos.forEach((dato) => {
          if (Array.isArray(dato.cocina)) {
            dato.cocina.forEach((c) => cocinasSet.add(c));
          } else {
            cocinasSet.add(dato.cocina);
          }
        });
      } else {
        console.error("Los datos no son un arreglo:", this.datos);
      }

      this.cocinas = Array.from(cocinasSet);
      console.log("Valores únicos de cocina:", this.cocinas);
    },

    filtro() {
      // Ordenar los datos antes de aplicar el filtro
      this.orden();

      // Aplicar el filtro
      this.datosFiltrados = this.datos.filter(
        (dato) =>
          this.cocina === "Todos" ||
          (Array.isArray(dato.cocina) && dato.cocina.includes(this.cocina)) ||
          dato.cocina === this.cocina
      );
      console.log("Datos filtrados:", this.datosFiltrados);
    },

    orden() {
      this.datos.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log("Datos ordenados:", this.datos);
    },


    verDetalle(dato) {
        console.log("Clic en tarjeta detectado.");
        // Guardar los datos de la tarjeta seleccionada en el almacenamiento local
        localStorage.setItem('tarjetaSeleccionada', JSON.stringify(dato));
    
        // Verificar que los datos se hayan almacenado correctamente
        console.log("Datos de tarjeta seleccionada:", dato);

        // Redirigir a la página de reserva1.html
        window.location.href = '../PAGES/reserva1.html';
    }

  },

  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
