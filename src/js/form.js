import proyectos from './form.data.js'

const contenedorProyectos = document.getElementById('ContenedorProyectos');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Función para listar los proyectos
const listarProyectos = (listaProyectos) => {
  return listaProyectos.map((proyecto, index) => `
    <div class="proyecto_item" data-index="${index}">
      <div class="contratante">
        <h3>Entidad contratante</h3>
        <p>${proyecto.entidadContratante}</p>
      </div>
      <div class="info_principal">
        <div class="enlace_secop">
          <h3>Enlace SECOP</h3>
          <a href="${proyecto.enlaceSECOP}" target="_blank">
            <img src="https://picsum.photos/200" alt="imagen del proyecto">
          </a>
        </div>
        <div class="detalles">
          <div class="contratista">
            <h3>Contratista</h3>
            <p>${proyecto.contratista}</p>
          </div>
          <div class="valor_inversion">
            <h3>Valor de la inversión</h3>
            <p>$ ${proyecto.valorDeLaInversion}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

// Función para mostrar el modal
const mostrarModal = (proyecto) => {
  modal.innerHTML = `
    <div class="modal_content">
      <button id="closeModal" class="close">&times;</button>
      <h3>${proyecto.entidadContratante}</h3>
      <p><strong>Descripción del proyecto:</strong> ${proyecto.descripcionDelProyecto}</p>
      <p><strong>Contratista:</strong> ${proyecto.contratista}</p>
      <p><strong>Valor de la inversión:</strong> $ ${proyecto.valorDeLaInversion}</p>
      <p><strong>Número de beneficiarios:</strong> ${proyecto.numeroDeBeneficiarios}</p>
      <p><strong>Grupo poblacional:</strong> ${proyecto.grupoPoblacional}</p>
      <a href="${proyecto.enlaceSECOP}" target="_blank">Ver más en SECOP</a>
    </div>
  `;

  // Mostrar el modal
  modal.classList.remove('hidden');
  
  const closeModalButton = document.getElementById('closeModal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', cerrarModal);
  }
};

// Función para cerrar el modal
const cerrarModal = () => {
  modal.classList.add('hidden');
};

// Renderizar proyectos
const proyectosListados = listarProyectos(proyectos);
contenedorProyectos.innerHTML = proyectosListados;

// Añadir eventos a cada proyecto
document.querySelectorAll('.proyecto_item').forEach((item, index) => {
  item.addEventListener('click', () => {
    mostrarModal(proyectos[index]);
  });
});