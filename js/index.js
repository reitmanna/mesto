const main = document.querySelector('.main');

const profile = main.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

const allPopup = main.querySelector('.popup');
const profileForm = allPopup.querySelector('.popup__field_profile');
const cardForm = allPopup.querySelector('.popup__field_card');

const popupProfile = allPopup.querySelector('.popup__section_profile');
const newName = profileForm.querySelector('.popup__form_type_name');
const newJob = profileForm.querySelector('.popup__form_type_job');

const popupCard = allPopup.querySelector('.popup__section_card');
const newCardTitle = cardForm.querySelector('.popup__form_type_title');
const newCardLink = cardForm.querySelector('.popup__form_type_link');

const popupImage = allPopup.querySelector('.popup__section_image');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupParagraph = popupImage.querySelector('.popup__paragraph');

const exitProfileButton = document.querySelector('.button_exit_profile');
const exitCardButton = allPopup.querySelector('.button_exit_card');
const exitImageButton = document.querySelector('.button_exit_image');

const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');


function findOpenedPopup() {
  const popupOpened = main.querySelector('.popup_opened');
  return popupOpened;
}

function closePopupWithEscape(evt) {
  const getOpened = findOpenedPopup();
  if ((evt.key === 'Escape') && getOpened) {
    closePopup(getOpened)
  }
}

function closePopup(modalWindowForm) {
  modalWindowForm.classList.remove('popup_opened');
};

function closeWithOverlay(evt) {
  const getOpened = findOpenedPopup();
  if (evt.target.classList.contains('popup_opened')) {
    evt.target.closest('.popup');
    closePopup(getOpened);
  }

};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__field'));
  formList.forEach((formElement) => {
    profileForm.addEventListener('submit', submitProfileForm);
    cardForm.addEventListener('submit', submitCardForm);
    setEventListeners(formElement);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit_inactive');
  }
}

enableValidation();



function profileAddForm() {
  newName.value = profileName.textContent;
  newJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = newName.value;
  profileJob.textContent = newJob.value;
  closePopup(popupProfile);
}


function openPopup(modalWindowForm) {
  modalWindowForm.classList.add('popup_opened');
}


const cardsArr = initialCards.map(createCard);
cards.append(...cardsArr);

function addNewCard() {
  const newCard = createCard({ name: newCardTitle.value, link: newCardLink.value });
  cards.prepend(newCard);
}

function createCard(addCard) {

  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like');
  const deleteButton = cardElement.querySelector('.button_trash');
  const cardImage = cardElement.querySelector('.element__image');
  const cardText = cardElement.querySelector('.element__text');

  cardText.textContent = addCard.name;
  cardImage.alt = addCard.name;
  cardImage.src = addCard.link;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });

  deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.element');
    card.remove();
  });

  function openFullImage(evt) {
    const openImage = evt.target;
    popupPhoto.src = openImage.src;
    popupPhoto.alt = openImage.alt;
    popupParagraph.textContent = openImage.alt;
    openPopup(popupImage);
  }

  cardImage.addEventListener('click', openFullImage);

  return cardElement;
}


function submitCardForm(evt) {
  evt.preventDefault();
  addNewCard(createCard);
  cardForm.reset();
  closePopup(popupCard);
}

main.addEventListener('keyup', closePopupWithEscape);

popupProfile.addEventListener('mousedown', closeWithOverlay);
popupCard.addEventListener('mousedown', closeWithOverlay);
popupImage.addEventListener('mousedown', closeWithOverlay);

exitProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
exitCardButton.addEventListener('click', () => { closePopup(popupCard) });
exitImageButton.addEventListener('click', () => { closePopup(popupImage) });

editButton.addEventListener('click', profileAddForm);
addButton.addEventListener('click', () => { openPopup(popupCard) });