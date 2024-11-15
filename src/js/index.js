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

function senData(event) {
  const formData = new FormData(event.target);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  console.log("Datos en JSON:", JSON.stringify(data, null, 2));
  registerForm.submit();
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

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
