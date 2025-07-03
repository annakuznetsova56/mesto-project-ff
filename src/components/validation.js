function showInputError(form, input, errorMessage, inputClass, errorClass) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.add(inputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(form, input, inputClass, errorClass) {
  const errorElement = form.querySelector(`.${input.name}-error`);
  input.classList.remove(inputClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(form, input, inputClass, errorClass) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputClass, errorClass);
  } else {
    hideInputError(form, input, inputClass, errorClass);
  }
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
      });
    });
  });
}

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveClass);
    buttonElement.disabled = false;
  }
}

export { enableValidation, clearValidation };
