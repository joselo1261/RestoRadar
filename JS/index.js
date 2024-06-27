// ---------- HEADER (Realizado en JS) ----------

document.querySelector("header").innerHTML = `
    <div class="logo">
      <img src="./IMAGENES/restoradar.png" alt="restoradar" />
    </div>
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
      <button class="cerrar-menu" id="cerrar"><i class="bi bi-x-lg"></i></button>
      <ul class="nav-list">
        <li>
          <a href="./PAGES/buscar.html">Buscar</a></li>
        <li>
          <a href="./PAGES/sumaTuLocal.html">SumaTuLocal</a>
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

// ------------------ Carousel (Realizado en VUE) ------------------

const { createApp } = Vue;

createApp({
  data() {
    return {
      restaurants: [],
      currentIndex: 0,
      intervalId: null,
      logoUrl: "",
      restaurantName: "",
      restaurantLat: "",
      restaurantLong: "",
      restaurantDireccion: "",
      restaurantBarrio: "",
      restaurantHorario: "",
      restaurantPrecio: "",
      restaurantCocina:[],
      restaurantCapacidad: 0,
      hoveredRestaurantName: "",
    };
  },

  methods: {
    async fetchData() {
      try {
        //const response = await fetch("https://user1261.pythonanywhere.com/restaurantes");
        const response = await fetch("../JSON/restaurantes.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data.restaurantes && data.restaurantes.length > 0) {
          this.restaurants = data.restaurantes;

        // Obtener los datos del primer restaurante
        const primerRestaurante = this.restaurants[0];
        this.restaurantLat = primerRestaurante.latitud;
        this.restaurantLong = primerRestaurante.longitud;
        this.restaurantName = primerRestaurante.name;
        this.restaurantDireccion = primerRestaurante.direccion;
        this.restaurantBarrio = primerRestaurante.barrio;
        this.restaurantHorario = primerRestaurante.horario;
        this.restaurantPrecio = primerRestaurante.precio;
        this.restaurantCapacidad = primerRestaurante.capacidad;
        this.restaurantCocina = primerRestaurante.cocina;

        // Llama a la función para actualizar el mapa con las nuevas coordenadas
        actualizarMapa(this.restaurantLat, this.restaurantLong);

        // console.log aquí para verificar los valores obtenidos
        console.log(
          "Datos del primer restaurante:",
          this.restaurantLat,
          this.restaurantLong,
          this.restaurantName,
          this.restaurantDireccion,
          this.restaurantBarrio,
          this.restaurantHorario,
          this.restaurantPrecio,
          this.restaurantCapacidad,
          this.restaurantCocina
        );
        } else {
        throw new Error("No se encontraron datos de restaurantes válidos");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  
    },

    nextSlide() {
      // Función para avanzar al siguiente slide
      const currentIndex = this.currentIndex;
      if (this.restaurants.length > 0) {
        const nextIndex = (currentIndex + 1) % this.restaurants.length;
        this.currentIndex = nextIndex;
      }
    },

    navigateToPage(restaurant) {
      const logoUrl = restaurant.logo;
      const restaurantName = restaurant.name;
      const restaurantLat = restaurant.latitud;
      const restaurantLong = restaurant.longitud;
      const restaurantDireccion = restaurant.direccion;
      const restaurantBarrio = restaurant.barrio;
      const restaurantHorario = restaurant.horario;
      const restaurantPrecio = restaurant.precio;
      const restaurantCocina = restaurant.cocina;
      const restaurantCapacidad = parseInt(restaurant.capacidad);

      const urlReserva = `../PAGES/reserva.html?logo=${encodeURIComponent(
      
        logoUrl
      )}&name=${encodeURIComponent(restaurantName)}&lat=${encodeURIComponent(
        restaurantLat
      )}&long=${encodeURIComponent(
        restaurantLong
      )}&direccion=${encodeURIComponent(
        restaurantDireccion
      )}&barrio=${encodeURIComponent(
        restaurantBarrio
      )}&horario=${encodeURIComponent(
        restaurantHorario
      )}&precio=${encodeURIComponent(
        restaurantPrecio
      )}&cocina=${encodeURIComponent(
        restaurantCocina
      )}&capacidad=${encodeURIComponent(restaurantCapacidad)}`;
      window.location.href = urlReserva;
    },

      // Para manejar el evento mouseover
        handleMouseOver(restaurantName) {
        this.hoveredRestaurantName = restaurantName;
        console.log("Mouse sobre:", restaurantName);
    }
  },

  mounted() {
    this.fetchData();
    this.intervalId = setInterval(this.nextSlide, 0);
  },
}).mount("#app");

// Función para actualizar el mapa con las nuevas coordenadas
function actualizarMapa(latitud, longitud) {
  var iframe = document.getElementById("googleMap");
  if (iframe) {
    iframe.src =
      "https://www.google.com/maps?q=" +
      latitud +
      "," +
      longitud +
      "&output=embed";
  } else {
    console.error(
      "El elemento con ID 'googleMap' no fue encontrado en el DOM."
    );
  }
}
