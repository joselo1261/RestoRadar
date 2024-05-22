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
        <li>
          <form id="loginform">
            <label for="username">
              <input type="text" id="username" name="username" placeholder="Usuario" required>
            </label>
            <label for="password">
              <input type="password" id="password" name="password" placeholder="Contraseña" required>
            </label>
            <button type="button" onclick="login()">Login</button>
            </form>
        </li>
        </ul>
    </nav>
`;

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


// ----------- Validacion Campos Formulario ----------- //

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const imageInput = document.getElementById('imagen');
  const fileName = document.getElementById('fileName');

  // Actualiza el texto de la etiqueta cuando se selecciona un archivo
  imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    fileName.textContent = file ? file.name : 'Una imagen de su Local';
  });
    form.addEventListener('submit', (event) => {
    // Previene el envío del formulario
    event.preventDefault();

    // Borra mensajes de error previos
    const errorElements = form.querySelectorAll('.error');
    errorElements.forEach(element => element.remove());

    // Validación General
    let isValid = true;

    // Validación Nombre
    const nombre = document.getElementById('nombre');
    if (nombre.value.trim() === '') {
      showError('nombre', 'El nombre es obligatorio');
      nombre.value = '';
      isValid = false;
    }

    // Validación Apellido
    const apellido = document.getElementById('apellido');
    if (apellido.value.trim() === '') {
      showError('apellido', 'El apellido es obligatorio');
      apellido.value = '';
      isValid = false;
    }

    // Validación Razon Social
    const razonSocial = document.getElementById('razonSocial');
    if (razonSocial.value.trim() === '') {
      showError('razonSocial', 'La razón social es obligatoria');
      razonSocial.value = '';
      isValid = false;
    }

    // Validación Telefono
    const telefono = document.getElementById('telefono');
    if (!isValidPhone(telefono.value.trim())) {
      showError('telefono', 'Introduce un número de teléfono válido (ej. (123)4567890)');
      telefono.value = '';
      isValid = false;
    }

    // Validación Email
    const email = document.getElementById('email');
    if (!isValidEmail(email.value.trim())) {
      showError('email', 'Introduce un correo electrónico válido');
      email.value = '';
      isValid = false;
    }

    // Validación Imagen
    const file = imageInput.files[0];
    if (file) {
      const fileType = file.type;
    	const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      	if (!validImageTypes.includes(fileType)) {
        	showError('imagen', 'Por favor, sube un archivo de imagen válido (JPEG, JPG, PNG, GIF).');
        isValid = false;
      }
    } else {
      showError('imagen', 'Por favor, sube una imagen.');
      isValid = false;
    }

    // Validación Consulta
    const consulta = document.getElementById('consulta');
    if (consulta.value.trim() === '') {
      showError('consulta', 'La consulta no puede estar vacía');
      consulta.value = '';
      isValid = false;
    }
    if (isValid) {
      errorElements.forEach(element => element.remove());
      // Muestra mensaje de enviado
      alert('Formulario Enviado, gracias por su interés, pronto nos contactaremos');
      // Resetea formulario para nuevo envío
      form.reset();
      // Restablece el texto de la etiqueta del archivo
      fileLabel.textContent = 'Una imagen de su Local';
    }
  });

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function isValidEmail(email) { // Define una función llamada isValidEmail que toma un argumento email.
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    const re = /^\(\d{3,4}\)\d{7,8}$/; // Se valida para el formato (xxx)-xxxxxxxx
    return re.test(phone);
  }
});

// ------------ Usuarios Login ----------------
var users = [
  { username: "admin", password: "admin1" },
  { username: "user1", password: "password1" },
  { username: "marcela", password: "marcela1" },
  { username: "carlos", password: "carlos1" },
  // Agregar más usuarios aquí si es necesario
];

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var validUser = false;

  if (username === "admin" && password === "admin1") {
    window.location.href = "accesoAdmin1.html";
    return;
  } else
    for (var i = 1; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        validUser = true;
        break;
      }
    }

  if (validUser) {
    window.location.href = "accesoRest.html";
  } else {
    alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}