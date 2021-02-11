let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let editButton = profile.querySelector('.button_edit');
let popup = main.querySelector('.popup');
let exitButton = popup.querySelector('.button_exit');
let form = popup.querySelector('.popup__field');
let newName = form.querySelector('.popup__form_name');
let newJob = form.querySelector('.popup__form_job');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function togglePopup () {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.toggle('popup_opened') 
    }
    else {
        popup.classList.toggle('popup_opened');
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = newName.value;;
    profileJob.textContent = newJob.value;
    exitButton.addEventListener('click', togglePopup);
}

form.addEventListener('submit', formSubmitHandler); 

editButton.addEventListener('click', togglePopup); 