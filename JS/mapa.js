// Usando OpenStreetMap => https://www.openstreetmap.org/
// Usando Leafletjs => https://leafletjs.com/
// Video Youtube explicativo https://youtu.be/ogYl2BDTEKs?si=LIQ-8bzqoe1PnVf-

const { createApp } = Vue;

createApp({
  data() {
    return {
      restaurantes: [],
      url: 'https://user1261.pythonanywhere.com/restaurantes',
      cargando: true,
      map: null,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.restaurantes = data;
          this.cargando = false;
          this.initMap(); // Llamar a la función para inicializar el mapa cuando los datos estén disponibles
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          this.cargando = false; // Asegurar que se marque como no cargando aunque haya errores
        });
    },
    initMap() {
      // Crear un mapa de acuerdo a las coordenadas de lat y long
      this.map = L.map("mi_mapa").setView([-34.58889, -58.43327], 12);

      // Muestra Mapa de OpenStreet
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="">RestoradarMap</a>',
      }).addTo(this.map);

      // Muestra ubicacion en el mapa y haciendo click muestra datos del mismo
      this.restaurantes.forEach(restaurante => {
        const marker = L.marker([restaurante.latitud, restaurante.longitud])
          .addTo(this.map)
          .bindPopup(`
            <div style="font-size: 12px; max-width: 150px;">
              <h4 style="margin: 0;">${restaurante.name}</h4>
              <p style="margin: 0;"><strong>Dirección:</strong> ${restaurante.direccion}</p>
              <p style="margin: 0;">
                <img src="${restaurante.foto}" style="width: 100%; height: auto;">
              </p>
            </div>
          `, {
            offset: [0,20] // Desplaza el popup hacia abajo
          });
      
        marker.on('click', () => {
          this.map.panBy([0, -100], { animate: true });
        });
      });

      // Función para mostrar latitud y longitud al hacer clic en el mapa
      this.map.on('click', e => {
        alert("Posición: " + e.latlng);
      });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#app');


// ---------------- HEADER ---------------------

document.querySelector("header").innerHTML = `
    <div class="logo">
    <img src="../IMAGENES/restoradar.png" alt="restoradar" />
    </div> 
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
      <button class="cerrar-menu" id="cerrar"><i class="bi bi-x-lg"></i></button>
      <ul class="nav-list">
        <ul class="nav-list">
        <li>
          <a href="./restaurantes.html">Restaurantes</a>
        </li>
      </ul>
      <ul class="nav-list">
        <li>
          <a href="./accesoAdmin1.html">Administrador</a>
        </li>
      </ul>
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


