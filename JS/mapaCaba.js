// Usando OpenStreetMap => https://www.openstreetmap.org/
// Usando Leafletjs => https://leafletjs.com/
// Video Youtube explicativo https://youtu.be/ogYl2BDTEKs?si=LIQ-8bzqoe1PnVf-

const { createApp } = Vue;

createApp({
  data() {
    return {
      restaurantes: [],
      allData: [],
      filteredData: [],
      pageSize: 50,
      currentPage: 0,
      url: "../JSON/oferta-gastronomica.geojson",
      cargando: true,
      map: null,
      markers: [], // Array para almacenar los marcadores
      selectedCategoria: '',
      selectedCocina: '',
      selectedBarrio: '',
      categorias: [],
      cocinas: [],
      barrios: []
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
          this.allData = data.features;
          this.filteredData = this.allData;
          this.extractFilters();
          this.loadPage();
          this.cargando = false;
          this.initMap();
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          this.cargando = false;
        });
    },
    extractFilters() {
      const categorias = new Set();
      const cocinas = new Set();
      const barrios = new Set();

      this.allData.forEach(feature => {
        categorias.add(feature.properties.categoria);
        cocinas.add(feature.properties.cocina);
        barrios.add(feature.properties.barrio);
      });

      this.categorias = Array.from(categorias);
      this.cocinas = Array.from(cocinas);
      this.barrios = Array.from(barrios);
    },
    applyFilters() {
      this.filteredData = this.allData.filter(feature => {
        const matchesCategoria = this.selectedCategoria === '' || feature.properties.categoria === this.selectedCategoria;
        const matchesCocina = this.selectedCocina === '' || feature.properties.cocina === this.selectedCocina;
        const matchesBarrio = this.selectedBarrio === '' || feature.properties.barrio === this.selectedBarrio;
        return matchesCategoria && matchesCocina && matchesBarrio;
      });
      this.currentPage = 0;
      this.loadPage();
    },
    loadPage() {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.restaurantes = this.filteredData.slice(start, end).map(feature => ({
        lat: feature.geometry.coordinates[1],
        long: feature.geometry.coordinates[0],
        name: feature.properties.nombre,
        direccion: feature.properties.direccion_completa,
        barrio: feature.properties.barrio,
        categoria: feature.properties.categoria,
        cocina: feature.properties.cocina
      }));

      if (this.map) {
        this.updateMarkers(); // Actualizar los marcadores en el mapa
      }
    },
    nextPage() {
      this.currentPage++;
      this.loadPage();
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.loadPage();
      }
    },
    initMap() {
      this.map = L.map("mi_mapa").setView([-34.58889, -58.43327], 12);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="">CABAMap</a>',
      }).addTo(this.map);

      this.updateMarkers(); // Agregar marcadores para la primera página
    },
    updateMarkers() {
      // Eliminar marcadores existentes
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];

      // Agregar nuevos marcadores
      this.restaurantes.forEach(restaurante => {
        const marker = L.marker([restaurante.lat, restaurante.long])
          .addTo(this.map)
          .bindPopup(`
            <div style="font-size: 12px; max-width: 150px;">
              <h4 style="margin: 0;">${restaurante.name}</h4>
              <p style="margin: 0;"><strong>Dirección:</strong> ${restaurante.direccion}</p>
              <p style="margin: 0;"><strong>Barrio:</strong> ${restaurante.barrio}</p>
              <p style="margin: 0;"><strong>Categoria:</strong> ${restaurante.categoria}</p>
              <p style="margin: 0;"><strong>Cocina:</strong> ${restaurante.cocina}</p>
            </div>
          `, {
            offset: [0, 20]
          });

        marker.on('click', () => {
          this.map.panBy([0, -100], { animate: true });
        });

        this.markers.push(marker); // Almacenar el marcador
      });

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


