import './styles/index.css'

import {
  Card
} from './components/Card.js'

import {
  initialCards,
  validationSet
} from './utils/constants.js'

import {
  FormValidator
} from './components/FormValidator.js'

import {
  PopupWithImage
} from './components/PopupWithImage.js'

import {
  Section
} from './components/Section.js'

import {
  PopupWithForm
} from './components/PopupWithForm.js'

import {
  UserInfo
} from './components/UserInfo.js'

import {
  buttonEditProfile,
  buttonAddCard,
  titleInput,
  linkInput,
  nameInput,
  jobInput
} from './utils/constants.js'


// Валидация формы карточки
const cardContentForm = document.querySelector('#popupForm-card');
const cardContentValidator = new FormValidator(validationSet, cardContentForm);
cardContentValidator.enableValidation();

// Добавить новую карточку
function createNewCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (title, link) => {
      const imageOpen = new PopupWithImage('.popup-photo')
      imageOpen.open(title, link);
      imageOpen.setEventListeners();
    }
  }, '#tmpl-cards');
  const newCard = card.generateCard();
  return newCard
};

const PopupCardCreate = new PopupWithForm({
  handleFormSubmit: (data) => {
    const formData = {
      title: data.title,
      link: data.link
    }
    const createdCard = createNewCard(formData)
    defaultCard.addItem(createdCard);
    cardContentValidator.disableSubmitButton();
  }
}, '.popup_type_card');

// Открыть попап карточки
buttonAddCard.addEventListener('click', () => {
  PopupCardCreate.open();
  cardContentValidator.resetFormElements(titleInput);
  cardContentValidator.resetFormElements(linkInput);
});
PopupCardCreate.setEventListeners();

// Добавить массив карточек на страницу
const defaultCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: (name, link) => {
        const imageOpen = new PopupWithImage('.popup-photo')
        imageOpen.open(name, link);
        imageOpen.setEventListeners();
      }
    }, '#tmpl-cards');
    const newCard = card.generateCard();
    defaultCard.addItem(newCard);
  }
}, '.cards');
defaultCard.rendererItem();

// Валидация формы профиля
const profileInfoForm = document.querySelector('#popupForm-profile');
const profileInfoValidator = new FormValidator(validationSet, profileInfoForm);
profileInfoValidator.enableValidation();

// Измененить данные профиля
const newData = new UserInfo('.profile__title', '.profile__subtitle');

const PopupEditInfo = new PopupWithForm({
  handleFormSubmit: (data) => {
    newData.setUserInfo(data.name, data.about)
  }
}, '.popup_type_profile');

// Открыть попап профиля
buttonEditProfile.addEventListener('click', () => {
  PopupEditInfo.open();

  const userInfo = newData.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;

  profileInfoValidator.resetFormElements(nameInput);
  profileInfoValidator.resetFormElements(jobInput);
});
PopupEditInfo.setEventListeners();