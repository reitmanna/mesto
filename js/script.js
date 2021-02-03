let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let editButton = profile.querySelector('.button__edit');
let popup = main.querySelector('.popup');
let exitButton = popup.querySelector('.button__exit');
let form = popup.querySelector('.popup__field');
let submitButton = form.querySelector('.button__submit');

function togglePopup () {
    popup.classList.toggle('popup__opened');
}
editButton.addEventListener('click', togglePopup); 

function removePopup () {
    popup.classList.remove('popup__opened');
}
exitButton.addEventListener('click', removePopup); 

let newName = form.querySelector('.popup__name');
let newJob = form.querySelector('.popup__job');

let nameInput = "";
let jobInput = "";

let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    nameInput = newName.value;
    jobInput = newJob.value;
    profileName.textContent = nameInput;
    profileJob.textContent = jobInput;
}

form.addEventListener('submit', formSubmitHandler); 

submitButton.addEventListener('click', removePopup);

