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


// Script para detalles de reserva y envío de correo

// Función para validar el formato del correo electrónico
function validarCorreo(correo) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
}

// Recuperar los datos del almacenamiento local
var restElegido = localStorage.getItem('restElegido');
var nombre = localStorage.getItem('nombre');
var telefono = localStorage.getItem('telefono');
var fecha = localStorage.getItem('fecha');
var hora = localStorage.getItem('hora');
var personas = localStorage.getItem('personas');
var lugar = localStorage.getItem('lugar');
var mesaReservada = localStorage.getItem('mesaReservada');

// Mostrar los datos en la página
document.getElementById('restElegido').textContent = restElegido;
document.getElementById('nombre').textContent = nombre;
document.getElementById('telefono').textContent = telefono;
document.getElementById('fecha').textContent = fecha;
document.getElementById('hora').textContent = hora;
document.getElementById('personas').textContent = personas;
document.getElementById('lugar').textContent = lugar;
document.getElementById('mesaReservada').textContent = mesaReservada;

// Agregar evento clic al botón de enviar correo
document.getElementById('enviarCorreo').addEventListener('click', function() {
  var correo = document.getElementById('email').value;
  if (validarCorreo(correo)) {
    // Aquí puedes agregar el código para enviar el correo
    alert('Correo enviado\nGracias por Elegirnos\nLos esperamos !!!!');
  } else {
    alert('Por favor, introduce un correo electrónico válido\nFormato: xxxxxx@xxx.xxx')
  }
});

// Validación de formulario y envío de datos
document.getElementById("miFormulario").addEventListener("submit", function (event) {
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
});
