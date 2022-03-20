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
  validationSet,
  buttonEditProfile,
  buttonAddCard,
  titleInput,
  linkInput,
  nameInput,
  jobInput,
  popupImage,
  popupConfirm,
  popupCard,
  popupProfile,
  cardContainer,
  profileName,
  profileAbout,
  profileInfoForm,
  cardContentForm,
  profileAvatar,
  buttonEditAvatar,
  avatarPopup,
  avatarForm,
  avatarLinkInput
} from '../utils/constants.js'

import {
  api
} from '../components/Api.js'

const cardContentValidator = new FormValidator(validationSet, cardContentForm);
const profileInfoValidator = new FormValidator(validationSet, profileInfoForm);
const popupAvatarValidator = new FormValidator(validationSet, avatarForm);
const newData = new UserInfo(profileName, profileAbout, profileAvatar, {
  data: []
});
let userId

// Валидация
profileInfoValidator.enableValidation();
cardContentValidator.enableValidation();
popupAvatarValidator.enableValidation();

// Создать карточу
function createNewCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      const imageOpen = new PopupWithImage(popupImage)
      imageOpen.open(name, link);
      imageOpen.setEventListeners();
    },

    handleDeleteClick: (id) => {
      popupDeleteConfirm.changeHandleSubmit(() => {
        api.deleteCard(id)
          .then(() => {
            card.removeCard()
            popupDeleteConfirm.close()
          })
      })
    },

    handleToggleLike: (id) => {
      if (card.isLiked()) {
        api.removeLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
      } else {
        api.likeCard(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
      }
    }

  }, '#tmpl-cards');

  const newCard = card.generateCard();
  return newCard
};

// Отрисовать карточки
function renderCard(item, wrap) {
  const card = createNewCard(item)
  wrap.prepend(card);
}

// Экземпляры классов
const newSection = new Section({
  items: [],
  renderer: renderCard
}, cardContainer);

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cardList]) => {
    newData.setUserInfo(userData.name, userData.about);
    newData.setUserAvatar(userData.avatar);
    userId = userData._id;
    cardList.reverse()
    cardList.forEach((res) => {
      const card = createNewCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        ownerId: res.owner._id,
        userId: userId
      })
      console.log(res)
      newSection.addItem(card);
    })
  })

const popupCardCreate = new PopupWithForm({
  handleFormSubmit: (data) => {

    api.addCard(data.name, data.link)
      .then((res) => {
        const createdCard = createNewCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          ownerId: res.owner._id,
          userId: userId
        })
        popupCardCreate.close()
        newSection.addItem(createdCard);
      })
    
    cardContentValidator.disableSubmitButton();
  }
}, popupCard);

const popupDeleteConfirm = new PopupWithForm({
  handleFormSubmit: () => {}
}, popupConfirm)

const popupEditInfo = new PopupWithForm({
  handleFormSubmit: (data) => {
    newData.setUserInfo(data.name, data.about);
    api.editProfile(data.name, data.about)
    .then(() => {
      popupEditInfo.close()
    })
    
  }
}, popupProfile);

const popupUpdateAvatar = new PopupWithForm({
  handleFormSubmit: (data) => {
    newData.setUserAvatar(data.link);
    api.updateAvatar(data.link)
    .then(() => {
      popupUpdateAvatar.close()
    })    
  }
}, avatarPopup);

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

buttonEditAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
  popupAvatarValidator.resetFormElements(avatarLinkInput);
})

// Установить слушатели
popupCardCreate.setEventListeners();
popupEditInfo.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupUpdateAvatar.setEventListeners();