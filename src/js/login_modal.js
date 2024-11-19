const modal = document.getElementById('modal');
const modalContenido = document.getElementById('modalContenido');
const botonAcceder = document.getElementById('acceder');

const cedula = document.getElementById('cedula');


/* Funcion para desplegar modal */
function abrirModal(e) {
  e.preventDefault();
  modal.classList.remove('hide');
  modal.classList.remove('animacion_ocultar');
}

/* Funcion para cerrar modal */
function cerrarModal(e) {
  modalContenido.classList.add('animacion_ocultar')
  setTimeout(() => {
    modal.classList.add('hide');
    modalContenido.classList.remove('animacion_ocultar')
  }, 300);
  cedula.value = '';
}

/* Funcion para admitir solo numeros */
function evitarLetras(event) {
  const key = event.key;

  // Verifica si la tecla presionada no es un número
  if (!/^[0-9]$/.test(key) && key !== "Backspace" && key !== "Tab") {
      event.preventDefault(); // Evita la entrada
  }
}


modalContenido.addEventListener("click", (e) => e.stopPropagation())
botonAcceder.addEventListener("click", abrirModal);
modal.addEventListener("click", cerrarModal);
cedula.addEventListener("keypress", (e) => evitarLetras(e))