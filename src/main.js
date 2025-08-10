import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const sliderWrapper = document.getElementById("slider-wrapper");
const slider = document.getElementById("slider");
const $btnM0vil = document.getElementById("btnMovil");
const slideItems = gsap.utils.toArray("#slider > div");
const $btnServcicios = document.getElementById("btn_servicios");
const $btnWass = document.querySelectorAll(".btn-wasapp");
const $btnTel = document.getElementById("telefono");

gsap.registerPlugin(ScrollTrigger);

if ($btnServcicios) {
  $btnServcicios.addEventListener("click", () => {
    console.log("mehicieron click");
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("menu-icon");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
      icon.innerHTML = `  <path fill="currentColor"
      d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2" />`;
    }
  });
}

if ($btnTel) {
  const numeroTelefono = "940848963";
  const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  $btnTel.addEventListener("click", () => {
    if (esMovil) {
      window.location.href = `tel:${numeroTelefono}`;
    }
  });
}
if ($btnWass.length > 0) {
  const numero = "51940848963";
  const mensaje = "Hola, estoy interesado en sus servicios contables en Cusco";
  $btnWass.forEach((ele) => {
    ele.addEventListener("click", () => {
      const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const textoCodificado = encodeURIComponent(mensaje);

      if (esMovil) {
        window.open(
          `https://wa.me/${numero}?text=${textoCodificado}`,
          "_blank"
        );
      } else {
        window.open(
          `https://web.whatsapp.com/send?phone=${numero}&text=${textoCodificado}`,
          "_blank"
        );
      }
    });
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    icon.innerHTML = `<path fill="#f00" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"/>`;
  } else {
    menu.classList.add("hidden");
    icon.innerHTML = `  <path fill="currentColor"
              d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2" />`;
  }
}

$btnM0vil.addEventListener("click", toggleMobileMenu);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up");
    }
  });
}, observerOptions);

document.querySelectorAll(".group").forEach((el) => observer.observe(el));

// Verificamos que los elementos existan
if (sliderWrapper && slider && slideItems.length > 0) {
  // Calculamos la distancia total que el slider necesita moverse
  // Es el ancho de todos los elementos menos el ancho de la ventana
  const totalWidth = slideItems.length * window.innerWidth;
  const distanceToScroll = totalWidth - window.innerWidth;
  gsap.to(slider, {
    x: -distanceToScroll, // Movemos el slider hacia la izquierda
    ease: "none",
    scrollTrigger: {
      trigger: sliderWrapper,
      pin: true, // Fija el contenedor en la pantalla
      scrub: 1, // Sincroniza la animación con el scroll de forma suave
      start: "center center", // La animación comienza cuando la parte superior del slider llega a la parte superior del viewport
      // La animación termina cuando hemos "scrolleado" la cantidad necesaria para mostrar todos los slides
      end: `+=${distanceToScroll}`,
      // Para la maquetación
      //   markers: true,
    },
  });
}
