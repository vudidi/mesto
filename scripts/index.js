import {
  Card
} from './Card.js'
import {
  initialCards,
  validationSet
} from './constants.js'
import {
  FormValidator
} from './FormValidator.js'

// Переменные попапов
const profileInfoPopup = document.querySelector('.popup_type_profile');
const cardContentPopup = document.querySelector('.popup_type_card');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddCard = document.querySelector('.profile__button-add');

// Переменные для попапа профиля
const buttonCloseProfile = profileInfoPopup.querySelector('.popup__close');
const formElementProfile = profileInfoPopup.querySelector('.popup__form');
const nameInput = profileInfoPopup.querySelector('.popup__form-input_info_name');
const jobInput = profileInfoPopup.querySelector('.popup__form-input_info_about');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

// Переменные для попапа карточек
const buttonCloseCardContent = cardContentPopup.querySelector('.popup__close');
const formElementCardContent = cardContentPopup.querySelector('.popup__form');


// Переменные для попапа фотографии
export const popupImage = document.querySelector('.popup-photo');
const buttonClosepopupImage = popupImage.querySelector('.popup__close');
export const photoTitle = popupImage.querySelector('.popup-photo__title');
export const photoLink = popupImage.querySelector('.popup-photo__link');

// Esc
function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Overlay
function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Открыть попап и Закрыть попап. Общие
export function openPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('mousedown', closeOnOverlay);
  document.addEventListener('keydown', closeOnEscape);
};

function closePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('mousedown', closeOnOverlay);
  document.removeEventListener('keydown', closeOnEscape);
};

// Валидация формы карточки
const cardContentForm = document.querySelector('#popupForm-card');
const cardContentValidator = new FormValidator(validationSet, cardContentForm);
cardContentValidator.enableValidation();

const titleInput = cardContentPopup.querySelector('.popup__form-input_info_title');
const linkInput = cardContentPopup.querySelector('.popup__form-input_info_link');

// Открыть попап карточки
function openPopupCardAdd() {
  openPopup(cardContentPopup);
  formElementCardContent.reset();
  cardContentValidator.resetFormElements(titleInput);
  cardContentValidator.resetFormElements(linkInput);
};
// // В submitFormHandlerCard добавлена отдельная функция для блокировки кнопки отправки (disableSubmitButton), 
// т.к. disable кнопки в resetFormElements происходит только при невалидной форме, 
// что позволяет также создать сразу несколько новых карточек

// Валидация формы профиля
const profileInfoForm = document.querySelector('#popupForm-profile');
const profileInfoValidator = new FormValidator(validationSet, profileInfoForm);
profileInfoValidator.enableValidation();

// Открыть попап профиля
function openPopupProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profileInfoPopup);
  profileInfoValidator.resetFormElements(nameInput);
  profileInfoValidator.resetFormElements(jobInput);
};

// Сохранить попап профиля
function submitFormHandlerProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profileInfoPopup);
};

// Получить шаблон для карточки
function receiveCard(item) {
  const card = new Card(item, '#tmpl-cards');
  const newCard = card.generateCard();
  return newCard
};

// Добавить краточку в разметку
function renderCard(item) {
  const renderedCard = receiveCard(item);
  document.querySelector('.cards').prepend(renderedCard);
}

// Добавить карточки из массива их в разметку
initialCards.forEach((item) => {
  renderCard(item)
});

// Создать карточку
const cardTitle = document.querySelector('.popup__form-input_info_title');
const cardLink = document.querySelector('.popup__form-input_info_link');

function submitFormHandlerCard(evt) {
  evt.preventDefault();
  renderCard({
    name: cardTitle.value,
    link: cardLink.value
  });
  cardContentValidator.disableSubmitButton();
  closePopup(cardContentPopup);
};

// Слушатели
buttonEditProfile.addEventListener('click', openPopupProfileInfo);
buttonCloseProfile.addEventListener('click', () => closePopup(profileInfoPopup));
buttonAddCard.addEventListener('click', openPopupCardAdd);
buttonCloseCardContent.addEventListener('click', () => closePopup(cardContentPopup));
formElementProfile.addEventListener('submit', submitFormHandlerProfile);
formElementCardContent.addEventListener('submit', submitFormHandlerCard);
buttonClosepopupImage.addEventListener('click', () => closePopup(popupImage));