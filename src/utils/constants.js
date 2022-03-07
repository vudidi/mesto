export const initialCards = [
    {
    title: 'Йеллоустонский национальный парк',
    link: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'Чима д`Аста',
    link: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1213&q=80'
  },
  {
    title: 'Гейрангер-фьорд',
    link: 'https://images.unsplash.com/photo-1497273145860-da6d5426776f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
  },
  {
    title: 'Капитол-Риф',
    link: 'https://images.unsplash.com/photo-1590377077710-f024869db419?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Улуру',
    link: 'https://images.unsplash.com/photo-1627868053217-b5cf77505bc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Карапынар',
    link: 'https://images.unsplash.com/photo-1631010098924-16f28a81ef8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80'
  }
]

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
export const popupImage = document.querySelector('.popup-photo');
export const photoTitle = popupImage.querySelector('.popup-photo__title');
export const photoLink = popupImage.querySelector('.popup-photo__link');
export const titleInput = cardContentPopup.querySelector('.popup__form-input_info_title');
export const linkInput = cardContentPopup.querySelector('.popup__form-input_info_link');
export const nameInput = document.querySelector('.popup__form-input_info_name');
export const jobInput = document.querySelector('.popup__form-input_info_about');
