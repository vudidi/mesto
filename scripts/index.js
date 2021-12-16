const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonClose = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__container");
const nameInput = document.querySelector(".popup__name");
const jobInput = document.querySelector(".popup__about");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__subtitle");

function openPopup(evt) {
  evt.preventDefault();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  popup.classList.add("popup_opened");
}

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.toggle("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
