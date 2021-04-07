const main = document.querySelector('.main');

const profile = main.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;

const cardText = cardTemplate.querySelector('.element__text');
const cardImage = cardTemplate.querySelector('.element__image');

const allPopup = main.querySelector('.popup');
const allSectionOfPopup = allPopup.querySelector('.popup__section');
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

const exitButton = document.querySelector('.button_exit');

const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');


function profileAddForm () {
  newName.value = profileName.textContent;
  newJob.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openPopup() {
  allSectionOfPopup.classList.add('popup_opened');
}

function closePopup() {
  allSectionOfPopup.classList.remove('popup_opened');
}


function formSubmitProfile (evt) {
    evt.preventDefault(); 
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    closePopup();
}

function formSubmitCard (evt) {
  evt.preventDefault();
  addInfoToTheForm(createCard());
  closePopup();
}


cardForm.addEventListener('submit', formSubmitCard);
profileForm.addEventListener('submit', formSubmitProfile);


editButton.addEventListener('click', profileAddForm); 
addButton.addEventListener('click', () => { openPopup(popupCard)});

exitButton.addEventListener('click', closePopup);




initialCards.forEach((addCard) => addInitialArrayOfCard(addCard, createCard()));


function addInitialArrayOfCard(addCard, cardItem) {
  cardText.textContent = addCard.name;
  cardImage.alt = addCard.name; 
  cardImage.src = addCard.link;
  cards.append(cardItem);
}

function addInfoToTheForm(cardItem) {
  cardImage.src = newCardLink.value;
  cardImage.alt = newCardTitle.value;
  cardText.textContent = newCardTitle.value;
  cards.prepend(cardItem);
}

function createCard() {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like');
  const deleteButton = cardElement.querySelector('.button_trash');
  const cardImage = cardElement.querySelector('.element__image');

  likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active')
  });
  
  deleteButton.addEventListener('click', function () {
  const card = deleteButton.closest('.element');
  card.remove();
  }); 

  function openImagePopup (evt) {
    popupImage.classList.add('popup_opened')
    const openImage = evt.target;
        popupPhoto.src = openImage.src;
        popupPhoto.alt = openImage.alt;
        popupParagraph.textContent = openImage.alt;

  }

  cardImage.addEventListener('click', openImagePopup);

  return cardElement;
}