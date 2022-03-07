import './index.css'

import {
  Card
} from '../components/Card.js'

import {
  FormValidator
} from '../components/FormValidator.js'

import {
  PopupWithImage
} from '../components/PopupWithImage.js'

import {
  Section
} from '../components/Section.js'

import {
  PopupWithForm
} from '../components/PopupWithForm.js'

import {
  UserInfo
} from '../components/UserInfo.js'

import {
  initialCards,
  validationSet,
  buttonEditProfile,
  buttonAddCard,
  titleInput,
  linkInput,
  nameInput,
  jobInput,
  popupImage,
  popupCard,
  popupProfile,
  cardContainer,
  profileName,
  profileAbout,
  profileInfoForm,
  cardContentForm
} from '../utils/constants.js'

const cardContentValidator = new FormValidator(validationSet, cardContentForm);
const profileInfoValidator = new FormValidator(validationSet, profileInfoForm);
const newData = new UserInfo(profileName, profileAbout);

// Валидация
profileInfoValidator.enableValidation();
cardContentValidator.enableValidation();

// Функции
function createNewCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (title, link) => {
      const imageOpen = new PopupWithImage(popupImage)
      imageOpen.open(title, link);
      imageOpen.setEventListeners();
    }
  }, '#tmpl-cards');
  const newCard = card.generateCard();
  return newCard
};

// Экземпляры классов
const popupCardCreate = new PopupWithForm({
  handleFormSubmit: (data) => {
    const formData = {
      title: data.title,
      link: data.link
    }
    const createdCard = createNewCard(formData)
    defaultCard.addItem(createdCard);
    cardContentValidator.disableSubmitButton();
  }
}, popupCard);

const popupEditInfo = new PopupWithForm({
  handleFormSubmit: (data) => {
    newData.setUserInfo(data.name, data.about)
  }
}, popupProfile);

// Обработчики событий
buttonAddCard.addEventListener('click', () => {
  popupCardCreate.open();
  cardContentValidator.resetFormElements(titleInput);
  cardContentValidator.resetFormElements(linkInput);
});

buttonEditProfile.addEventListener('click', () => {
  popupEditInfo.open();
  const userInfo = newData.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  profileInfoValidator.resetFormElements(nameInput);
  profileInfoValidator.resetFormElements(jobInput);
});

// Добавить массив карточек на страницу
const defaultCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createNewCard(item)
    defaultCard.addItem(card);
  }
}, cardContainer);
defaultCard.rendererItem();

// Установить слушатели
popupCardCreate.setEventListeners();
popupEditInfo.setEventListeners();
