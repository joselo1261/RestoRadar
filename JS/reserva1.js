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
          <a href="../PAGES/buscar.html">Buscar</a>
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


// ------------ ARMAR TARJETA SELECCIONADA ------------------- //
 document.addEventListener('DOMContentLoaded', function () {
    const dato = JSON.parse(localStorage.getItem('tarjetaSeleccionada'));

    // Mostrar los datos de la tarjeta seleccionada
    const detalleDiv = document.getElementById('detalleApp');
    detalleDiv.innerHTML = `
        <h2>${dato.name}</h2>
        <img src="${dato.foto}" alt="Foto del restaurante">
        <p><strong>Dirección: </strong> ${dato.direccion}</p>
        <p><strong>Barrio: </strong> ${dato.barrio}</p>
        <p><strong>Cocina: </strong> ${dato.cocina.join(', ')}</p>
        <p><strong>Horario: </strong> ${dato.horario}</p>
        <p><strong>Precio: </strong> ${dato.precio}</p>
    `;


    // Crear un mapa de Google en un iframe con las coordenadas del restaurante
    const lat = dato.latitud; 
    const long = dato.longitud;

    /// Construir la URL de Google Maps con las coordenadas
    const googleMapUrl = `https://www.google.com/maps?q=${lat},${long}&output=embed`;

    // Establecer la URL de Google Maps como el src del iframe
    const googleMapIframe = document.getElementById("googleMap");
    googleMapIframe.src = googleMapUrl;

    // Mostrar el nombre del restaurante en el campo del formulario
    const restaurantNameSpan = document.getElementById('restElegido');
    restaurantNameSpan.textContent = dato.name;
});


// ------------ CREAR GRILLA MESAS -----------------------

// Selecciona los elementos del DOM
const gridContainer = document.getElementById("gridContainer");
const numeroSeleccionado = document.getElementById("numeroSeleccionado");
let cuadradoSeleccionadoAnteriormente = null;

// Llamar la tarjerta Seleccionda y traer la capacidad del restaurante
const dato = JSON.parse(localStorage.getItem('tarjetaSeleccionada'));

// Configuración de la grilla
const numCols = 5; // Número de columnas Fijas
const capacidad = dato.capacidad;
console.log("Capacidad: ",capacidad);
const numRows = Math.ceil(capacidad / numCols);

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
    event.preventDefault();

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
    event.preventDefault();

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
