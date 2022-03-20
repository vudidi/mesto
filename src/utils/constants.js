export const validationSet = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__error_visible'
}

export const cardContentPopup = document.querySelector('.popup_type_card');
export const buttonEditProfile = document.querySelector('.profile__button-edit');
export const buttonAddCard = document.querySelector('.profile__button-add');
export const titleInput = cardContentPopup.querySelector('.popup__form-input_info_title');
export const linkInput = cardContentPopup.querySelector('.popup__form-input_info_link');
export const nameInput = document.querySelector('.popup__form-input_info_name');
export const jobInput = document.querySelector('.popup__form-input_info_about');
export const profileImage = document.querySelector('.profile__image');
export const popupImage = '.popup-photo';
export const popupCard = '.popup_type_card';
export const popupProfile = '.popup_type_profile';
export const popupConfirm = '.popup_type_confirm';
export const cardContainer = '.cards'
export const profileName = '.profile__title'
export const profileAbout = '.profile__subtitle'
export const profileAvatar = '.profile__image';
export const avatarPopup = '.popup_type_avatar';
export const profileInfoForm = document.querySelector('#popupForm-profile');
export const cardContentForm = document.querySelector('#popupForm-card');
export const buttonEditAvatar = document.querySelector('.profile__image');

export function renderLoadingProfile(isLoading) {
    if (isLoading) {
      document.getElementById('save-profile').textContent = 'Сохранение...'
    } else {
      document.getElementById('save-profile').textContent = 'Сохранить'
    }
  }
  export function renderLoadingAvatar(isLoading) {
    if (isLoading) {
      document.getElementById('save-avatar').textContent = 'Сохранение...'
    } else {
      document.getElementById('save-avatar').textContent = 'Сохранить'
    }
  }
  
  export function renderLoadingNewCard(isLoading) {
    if (isLoading) {
      document.getElementById('save-photo').textContent = 'Сохранение...'
    } else {
      document.getElementById('save-photo').textContent = 'Создать'
    }
  }
  
  export function renderLoadingDeleteCard(isLoading) {
    if (isLoading) {    
      document.getElementById('delete-confirm').textContent = 'Сохранение...'
    } else {
      document.getElementById('delete-confirm').textContent = 'Да'
    }
  }