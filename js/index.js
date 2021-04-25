const main = document.querySelector('.main');

const profile = main.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

const allPopup = main.querySelector('.popup');
const profileInput = allPopup.querySelector('.popup__form_profile');
const cardInput = allPopup.querySelector('.popup__form_card');

const popupProfile = allPopup.querySelector('.popup__section_profile');
const newName = profileInput.querySelector('.popup__input_type_name');
const newJob = profileInput.querySelector('.popup__input_type_job');

const popupCard = allPopup.querySelector('.popup__section_card');
const newCardTitle = cardInput.querySelector('.popup__input_type_title');
const newCardLink = cardInput.querySelector('.popup__input_type_link');

const popupImage = allPopup.querySelector('.popup__section_image');
const popupPhoto = popupImage.querySelector('.popup__photo');
const popupParagraph = popupImage.querySelector('.popup__paragraph');

const exitProfileButton = allPopup.querySelector('.button_exit_profile');
const exitCardButton = allPopup.querySelector('.button_exit_card');
const exitImageButton = allPopup.querySelector('.button_exit_image');

const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');


function findOpenedPopup() {
  const popupOpened = main.querySelector('.popup_opened');
  return popupOpened;
}

function openPopup(modalWindowForm) {
  modalWindowForm.classList.add('popup_opened');
  main.addEventListener('keyup', closePopupWithEscape);
}

function closePopup(modalWindowForm) {
  modalWindowForm.classList.remove('popup_opened');
  main.removeEventListener('keyup', closePopupWithEscape);
};

function closePopupWithEscape(evt) {
  const popupOpened = findOpenedPopup();
  if ((evt.key === 'Escape') && popupOpened) {
    closePopup(popupOpened)
  }
}

function closeWithOverlay(evt) {
  const popupOpened = findOpenedPopup();
  if (evt.target.classList.contains('popup_opened')) {
    evt.target.closest('.popup');
    closePopup(popupOpened);
  }
};

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

function submitCardForm(evt) {
  evt.preventDefault();
  addNewCard(createCard);
  cardInput.reset();
  closePopup(popupCard);
}

function renderInitialCards() {
  const cardsArr = initialCards.map(createCard);
  cards.append(...cardsArr);
}
renderInitialCards();

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


profileInput.addEventListener('submit', submitProfileForm);
cardInput.addEventListener('submit', submitCardForm);

popupProfile.addEventListener('mousedown', closeWithOverlay);
popupCard.addEventListener('mousedown', closeWithOverlay);
popupImage.addEventListener('mousedown', closeWithOverlay);

exitProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
exitCardButton.addEventListener('click', () => { closePopup(popupCard) });
exitImageButton.addEventListener('click', () => { closePopup(popupImage) });

editButton.addEventListener('click', profileAddForm);

addButton.addEventListener('click', () => {
  openPopup(popupCard);
  cardInput.reset();
});