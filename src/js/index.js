import { Form } from "./api_form.js";

const registerForm = document.getElementById("form");

function showError(invalidFields) {
  invalidFields.forEach((field, index) => {
    const errorMessage =
      document.getElementsByClassName("error-message")[index];
    if (errorMessage) {
      errorMessage.textContent = "Este campo no puede estar vacío.";
      errorMessage.style.visibility = "visible";
    }
    field.classList.add("input-error");
  });
}

function clearErrorMessages() {
  const inputFields = document.querySelectorAll("input, select");
  const errorMessages = document.getElementsByClassName("error-message");
  inputFields.forEach((field, index) => {
    if (field.value !== "") {
      const errorMessage = errorMessages[index];
      errorMessage.style.visibility = "hidden";
    }
    field.classList.remove("input-error");
  });

  inputFields.forEach((field, index) => {
    field.addEventListener("input", () => {
      const errorMessage = errorMessages[index];
      if (errorMessage) {
        errorMessage.style.visibility = "hidden";
      }
      field.classList.remove("input-error");
    });
  });
}

async function senData(event) {
  const formData = new FormData(event.target);
  const data = {};
  
  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log("Datos en JSON:", JSON.stringify(data, null, 2));

  // Crear instancia de la clase Form
  const api = new Form('http://localhost:8000');

  try {
    // Realizar la peticion con Axios usando la clase Form
    const response = await api.sendGetRequest('/form_registration/', data);

    console.log("Respuesta del servidor:", response);

    if (response.status === "success") {
<<<<<<< HEAD
        Swal.fire({
          icon: 'success',
          title: 'Realizado',
          text: response.message || 'Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo.',
          confirmButtonText: 'Aceptar'
          }).then((result) => {
              if (result.isConfirmed) {
                  // Recargar pagina después de que el usuario confirme
                  // window.location.reload();
              }
          });
=======
      Swal.fire({
        icon: 'success',
        title: 'Realizado',
        text: response.message || 'Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          // reload the current page 
          window.location.reload();
        }
      });

>>>>>>> 49452889d656d72ff996eca985dac0cc01fc1ccf
    } else if (response.status === "error") {
      // Usando SweetAlert para mostrar un error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.message || 'Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'Aceptar'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.message || 'Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo.',
        confirmButtonText: 'Aceptar'
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Ocurrió un error al enviar los datos. Por favor, inténtelo de nuevo.',
      confirmButtonText: 'Aceptar'
    });
  }
}


registerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Esto ya previene la recarga por defecto

  const formElements = [...event.target.elements];
  const inputFields = formElements.filter(
    (element) => element.tagName === "INPUT" || element.tagName === "SELECT"
  );

  const invalidFields = inputFields.filter(
    (field) => field.value.trim() === ""
  );

  if (invalidFields.length > 0) {
    showError(invalidFields);
  } else {
    senData(event); 
  }
  clearErrorMessages();
});
