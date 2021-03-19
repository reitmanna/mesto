let main = document.querySelector('.main');

let profile = main.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

let cards = document.querySelector('.elements');
let cardTemplate = document.querySelector('.element-template').content;

let popup = main.querySelector('.popup');
const profileForm = popup.querySelector('.popup__field_profile');
const cardForm = popup.querySelector('.popup__field_card');

let popupProfile = popup.querySelector('.popup__profile');
let newName = profileForm.querySelector('.popup__form_type_name');
let newJob = profileForm.querySelector('.popup__form_type_job');

let popupCard = popup.querySelector('.popup__card');
let newCardTitle = cardForm.querySelector('.popup__form_type_title');
let newCardLink = cardForm.querySelector('.popup__form_type_link');

let popupImage = popup.querySelector('.popup__image');
let popupPhoto = popupImage.querySelector('.popup__photo');
let popupParagraph = popupImage.querySelector('.popup__paragraph');


const exitProfileButton = document.querySelector('.button_exit_profile');
const exitCardButton = popup.querySelector('.button_exit_card');
const exitImageButton = document.querySelector('.button_exit_image');
const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

// 0 //

function togglePopupProfile () {
    popupProfile.classList.toggle('popup_opened');
    if (popupProfile.classList.contains('popup_opened')) {
        newName.value = profileName.textContent;
        newJob.value = profileJob.textContent;
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    togglePopupProfile()
}
profileForm.addEventListener('submit', formSubmitHandler);

exitProfileButton.addEventListener('click', togglePopupProfile);
editButton.addEventListener('click', togglePopupProfile); 




initialCards.forEach((addCard) => addCardArray(addCard, createCard()));


function createCard() {
  const cardElement = cardTemplate.cloneNode(true);
// 4 // 
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active')
  });
// 5 //
  const deleteButton = cardElement.querySelector('.button_trash');
  deleteButton.addEventListener('click', function () {
  let card = deleteButton.closest('.element');
  card.remove();
  }); 
// 6 // 
const imageButton = cardElement.querySelector('.button_image');
  function addPopupImage (evt) {
    popupImage.classList.add('popup_opened')
    const openImage = evt.target;
        popupPhoto.src = openImage.src;
        popupParagraph.textContent = openImage.alt;  
  }
  function removePopupImage () {
    popupImage.classList.remove('popup_opened')
  }
  imageButton.addEventListener('click', addPopupImage);
  exitImageButton.addEventListener('click', removePopupImage);
  console.log(cardElement);
  return cardElement;
}

// 3 //
function addCardArray(addCard, cardItem) {
  cardItem.querySelector('.element__text').textContent = addCard.name;
  cardItem.querySelector('.element__image').alt = addCard.name; 
  cardItem.querySelector('.element__image').src = addCard.link;
  cards.append(cardItem);
}

function addInfoForm(cardItem) {
  cardItem.querySelector('.element__image').src = newCardLink.value;
  cardItem.querySelector('.element__image').alt = newCardTitle.value;
  cardItem.querySelector('.element__text').textContent = newCardTitle.value;
  cards.prepend(cardItem);
}

function formSubmitCard (evt) {
  evt.preventDefault();
  addInfoForm(createCard());
  togglePopupCard()
};
cardForm.addEventListener('submit', formSubmitCard);





// 2 //

function togglePopupCard () {
    popupCard.classList.toggle('popup_opened');
    if (popupCard.classList.contains('popup_opened')) {
    }
}


// 2 // 

addButton.addEventListener('click', togglePopupCard);
exitCardButton.addEventListener('click', togglePopupCard);