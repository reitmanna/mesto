let main = document.querySelector('.main');
let profile = main.querySelector('.profile');
let editButton = profile.querySelector('.button_edit');
let popup = main.querySelector('.popup');
let exitButton = popup.querySelector('.button_exit');
let form = popup.querySelector('.popup__field');
let newName = form.querySelector('.popup_form-name');
let newJob = form.querySelector('.popup_form-job');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

function togglePopup () {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
        newName.value = profileName.innerHTML;
        newJob.value = profileJob.innerHTML;
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = newName.value;
    profileJob.textContent = newJob.value;
    togglePopup()
}

form.addEventListener('submit', formSubmitHandler); 

exitButton.addEventListener('click', togglePopup);
editButton.addEventListener('click', togglePopup); 