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
  avatarForm
} from '../utils/constants.js'

import {
  api
} from '../components/Api.js'

const cardContentValidator = new FormValidator(validationSet, cardContentForm);
const profileInfoValidator = new FormValidator(validationSet, profileInfoForm);
const popupAvatarValidator = new FormValidator(validationSet, avatarForm);

profileInfoValidator.enableValidation();
cardContentValidator.enableValidation();
popupAvatarValidator.enableValidation();

const newData = new UserInfo(profileName, profileAbout, profileAvatar);
const popupDeleteConfirm = new PopupWithForm({
  handleFormSubmit: () => {}
}, popupConfirm);
const imageOpen = new PopupWithImage(popupImage);
let userId

// Создать карточу
function createNewCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (name, link) => {
      imageOpen.open(name, link);
    },

    handleDeleteClick: (id) => {      popupDeleteConfirm.open()
      
      popupDeleteConfirm.changeHandleSubmit(() => {
        popupDeleteConfirm.renderLoading(true)     
        api.deleteCard(id)
          .then(() => {            
            card.removeCard()
            popupDeleteConfirm.close()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            popupDeleteConfirm.renderLoading(false, 'Да')
          })
      })
    },

    handleToggleLike: (id) => {
      if (card.isLiked()) {
        api.removeLike(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.likeCard(id)
          .then((res) => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }

  }, '#tmpl-cards');

  const newCard = card.generateCard();
  return newCard
};

// Экземпляры классов
const newSection = new Section({
  renderer: (res) => {
    newSection.addItem(createNewCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      ownerId: res.owner._id,
      userId: userId
    }))
  }
}, cardContainer);


Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, res]) => {
    newData.setUserInfo(userData.name, userData.about);
    newData.setUserAvatar(userData.avatar);
    userId = userData._id;
    res.reverse()
    newSection.rendererItem(res);
  })
  .catch((err) => {
    console.log(err)
  })

const popupCardCreate = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupCardCreate.renderLoading(true)
    api.addCard(data.name, data.link)
      .then((res) => {
        newSection.addItem(createNewCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          ownerId: res.owner._id,
          userId: userId
        }));
        popupCardCreate.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupCardCreate.renderLoading(false, 'Создать')
      })
  }
}, popupCard);

const popupEditInfo = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupEditInfo.renderLoading(true)
    api.editProfile(data.name, data.about)
      .then(() => {
        newData.setUserInfo(data.name, data.about);
        popupEditInfo.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupEditInfo.renderLoading(false, 'Сохранить')
      })

  }
}, popupProfile);

const popupUpdateAvatar = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupUpdateAvatar.renderLoading(true)
    api.updateAvatar(data.link)
      .then(() => {
        newData.setUserAvatar(data.link);
        popupUpdateAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupUpdateAvatar.renderLoading(false, 'Сохранить')
      })
  }
}, avatarPopup);

// Обработчики событий
buttonAddCard.addEventListener('click', () => {
  popupCardCreate.open();
  cardContentValidator.resetValidation();
});

buttonEditProfile.addEventListener('click', () => {
  popupEditInfo.open();
  const userInfo = newData.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  profileInfoValidator.resetValidation();
});

buttonEditAvatar.addEventListener('click', () => {
  popupUpdateAvatar.open();
  popupAvatarValidator.resetValidation();
})

// Установить слушатели
popupCardCreate.setEventListeners();
popupEditInfo.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupUpdateAvatar.setEventListeners();
imageOpen.setEventListeners();