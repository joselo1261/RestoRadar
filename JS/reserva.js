// ---------------- HEADER --------------------- //

document.querySelector("header").innerHTML = `
<div class="logo">
      <img src="../IMAGENES/restoradar.png" alt="restoradar" />
    </div>
    <button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
    <nav class="nav" id="nav">
      <button class="cerrar-menu" id="cerrar"><i class="bi bi-x-lg"></i></button>
      <ul class="nav-list">
        <li>
          <a href="./buscar.html">Buscar</a>
        </li>
        <li>
          <a href="../index.html">Inicio</a>
        </li>
      </ul>
    </nav>
`;

// ---------- FOOTER ----------

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


// ------------ CREAR GRILLA MESAS -----------------------
// Lee los parámetros de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const capacidad = urlParams.get('capacidad');
console.log("Capacidad: ",capacidad); // Verificar capacidad

// Selecciona los elementos del DOM
const gridContainer = document.getElementById("gridContainer");
const numeroSeleccionado = document.getElementById("numeroSeleccionado");
let cuadradoSeleccionadoAnteriormente = null;

// Llamar la tarjerta Seleccionda y traer la capacidad del restaurante
const dato = JSON.parse(localStorage.getItem('tarjetaSeleccionada'));

// Configuración de la grilla
const numCols = 5; // Número de columnas Fijas
const numRows = Math.ceil(capacidad / numCols); // Número de filas

// Establecer el estilo del contenedor de la grilla
gridContainer.style.display = 'grid';
gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
gridContainer.style.gap = '10px';

// Itera para crear cada cuadrado en la grilla
for (let i = 1; i <= capacidad; i++) {
  const gridItem = document.createElement("div");
  gridItem.classList.add("grid-item");

  // Añadir imagen y número al gridItem
  gridItem.innerHTML = `
    <img src="../IMAGENES/square-image.png" alt="Cuadrado" class="square-image">
    <span class="number">${i}</span>
  `;

  // Agrega el evento de clic
  gridItem.addEventListener("click", () => {
    if (cuadradoSeleccionadoAnteriormente) {
      cuadradoSeleccionadoAnteriormente.classList.remove("selected");
    }

    cuadradoSeleccionadoAnteriormente = gridItem;
    gridItem.classList.toggle("selected");

    numeroSeleccionado.textContent = gridItem.classList.contains("selected") ? i : "";

    // Muestra el número seleccionado al lado de "Elige tu Mesa"
    numeroSeleccionadoEligeMesa.textContent = i;
  });

  gridContainer.appendChild(gridItem);
}



// ---------- ENVIAR FORMULARIO RESERVA ----------

// Validación de formulario
document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar enviar el formulario automáticamente

    // Validar los datos del formulario
    if (validarFormulario()) {
      // Enviar formulario si es válido
      enviarFormulario();
    } else {
      // Mostrar mensaje de error al usuario si el formulario no es válido
      mostrarMensajeError();
    }
  });


// Obtener los datos del formulario y enviar correo después de la redirección
document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar enviar el formulario automáticamente

    const form = event.target;

    // Obtener los datos del formulario utilizando FormData
    const formData = new FormData(form);
    const restElegido = document.getElementById("restElegido").textContent;
    const mesaReservada = document.getElementById("numeroSeleccionado").textContent;

    const datos = {
      restElegido,
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      fecha: new Date(formData.get("fecha")).toLocaleDateString("es-ES"),
      hora: formData.get("hora"),
      personas: formData.get("personas"),
      lugar: formData.get("lugar"),
      mesaReservada
    };

    // Guardar los datos en el almacenamiento local
    Object.entries(datos).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    // Redirigir a la página de destino
    window.location.href = "./formulario.html";

    // Enviar el correo electrónico después de la redirección
    enviarCorreo();
  });

  

// Para pasar el logo de la pagina de Inicio al de Reserva
document.addEventListener("DOMContentLoaded", function () {
  // Obtener la URL del logo del restaurante desde la URL actual
  const params = new URLSearchParams(window.location.search);
  const logoUrl = params.get("logo");

  // Mostrar el logo en el elemento correspondiente
  const imagenSeleccionada = document.getElementById("imagenSeleccionada");
  const linkReserva = imagenSeleccionada.querySelector("a");
  const imgElement = document.createElement("img");
  imgElement.src = logoUrl;
  imgElement.alt = "Logo del restaurante";
  linkReserva.appendChild(imgElement);
});

// Obtener el nombre del restaurante de la URL
const params = new URLSearchParams(window.location.search);
const restaurantName = decodeURIComponent(params.get("name"));

// Asignar el nombre del restaurante al elemento <span> con el id 'restElegido'
document.getElementById("restElegido").textContent = restaurantName;

// Para pasar el nombre de la pagina de Inicio al de Reserva
document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const restaurantName = urlParams.get("name");
  document.getElementById("restElegido").textContent = restaurantName;
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const lat = urlParams.get("lat");
  const long = urlParams.get("long");
  const direccion = urlParams.get("direccion");
  const barrio = urlParams.get("barrio");
  const horario = urlParams.get("horario");
  const precio = urlParams.get("precio");

  // Asignar valores a los elementos HTML
  document.getElementById("direccion").innerText = direccion;
  document.getElementById("barrio").innerText = barrio;
  document.getElementById("horario").innerText = horario;
  document.getElementById("precio").innerText = precio;

  
  // Construir la URL de Google Maps con las coordenadas
  const googleMapUrl = `https://www.google.com/maps?q=${lat},${long}&output=embed`;

  // Establecer la URL de Google Maps como el src del iframe
  const googleMapIframe = document.getElementById("googleMap");
  googleMapIframe.src = googleMapUrl;
});
