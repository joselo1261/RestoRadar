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
          <a href="../index.html" target="_blank">Inicio</a>
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


// ---------- MENU HAMBURGUESA ----------

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


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







// -------------- Zona de Graficos ---------------- //

$(document).ready(function() {
  $("input[type=radio]").click(function(event){
      var valor = $(event.target).val();
      if(valor =="Graficos1"){
          $("#div1").show();
          $("#div2").hide();
          $("#div3").hide();
          $("#div4").hide();
      } else if (valor == "Graficos2") {
          $("#div1").hide();
          $("#div2").show();
          $("#div3").hide();
          $("#div4").hide();
      } else if (valor == "Graficos3") {
          $("#div1").hide();
          $("#div2").hide();
          $("#div3").show();
          $("#div4").hide();
      } else if (valor == "Graficos4") {
          $("#div1").hide();
          $("#div2").hide();
          $("#div3").hide();
          $("#div4").show();
      }  else { 
          $("#div1").hide();
          $("#div2").hide();
          $("#div3").hide();
          $("#div4").hide();
      }
  });
});