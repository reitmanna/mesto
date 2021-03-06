// показать сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

// скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

// поиск и обработка всех форм
// принимаю параметры в определении функции enableValidation 
const enableValidation = (validationSettings) => {
  addButton.addEventListener('click', () => {
  updateInput(validationSettings);
  updateButton(validationSettings);
  }); 
  editButton.addEventListener('click', () => {
  updateInput(validationSettings);
  updateButton(validationSettings);
  });
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, validationSettings);
  }); 
}

const updateButton = (validationSettings) => {
  const buttonElement = document.querySelectorAll(validationSettings.submitButtonSelector);
  buttonElement.forEach((item) => {
    item.disabled = true;
    item.classList.add(validationSettings.inactiveButtonClass);
  })
}

const updateInput = (validationSettings) => {
  const inputList = document.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((item) => {
    hideInputError(item.closest(validationSettings.formSelector), item, validationSettings);
  })
}

// добавить обработчики всем полям формы
const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
};

// проверяем все ли поля прошли валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// блокировка кнопки 'submit'
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList, validationSettings)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

 // передаю при вызове функции enableValidation аргумент validationSettings
enableValidation(validationSettings);

