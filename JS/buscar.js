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
      url: "../JSON/restaurantes.json",
      datos: [],
      cocina: "Todos",
      cocinas: [],
      tarjetas: [],
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
            this.generateTarjetas(); // Generamos las tarjetas completas
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
    },

    orden() {
      this.datos.sort((a, b) => (a.name > b.name ? 1 : -1));
    },

    irAreserva(restaurante) {
      // Almacenar la tarjeta completa en el localStorage antes de redirigir a la página de reserva
      localStorage.setItem('tarjetaSeleccionada', JSON.stringify(restaurante));

      // Construir la URL de la página de reserva con los datos del restaurante como parámetros de la URL
      const params = new URLSearchParams({
        name: restaurante.name,
        direccion: restaurante.direccion,
        barrio: restaurante.barrio,
        cocina: JSON.stringify(restaurante.cocina),
        horario: restaurante.horario,
        precio: restaurante.precio,
        latitud: restaurante.latitud,
        longitud: restaurante.longitud
      
      });
      
      const url = `../PAGES/reserva1.html?${params.toString()}`;
      
      // Redirigir a la página de reserva
      window.location.href = url;
    },


    generateTarjetas() {
      // Generar las tarjetas completas a partir de los datos
      this.tarjetas = this.datos.map(dato => {
        return {
          id: dato.id,
          name: dato.name,
          foto: dato.foto,
          direccion: dato.direccion,
          barrio: dato.barrio,
          cocina: dato.cocina,
          horario: dato.horario,
          precio: dato.precio,
        };
      });
    }
  },

  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
