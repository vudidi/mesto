const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonClose = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__about");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");

function togglePopup(evt) {
  evt.preventDefault();
  popup.classList.toggle("popup_opened")
};

buttonEdit.addEventListener("click", togglePopup);
buttonClose.addEventListener("click", togglePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.toggle("popup_opened")
};

formElement.addEventListener("submit", formSubmitHandler);
