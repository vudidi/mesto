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
const titleInput = cardContentPopup.querySelector('.popup__form-input_info_title');
const linkInput = cardContentPopup.querySelector('.popup__form-input_info_link');

// Переменные для попапа фотографии
const popupImage = document.querySelector('.popup-photo');
const buttonClosepopupImage = popupImage.querySelector('.popup__close');
const photoTitle = popupImage.querySelector('.popup-photo__title');
const photoLink = popupImage.querySelector('.popup-photo__link');

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
function openPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('mousedown', closeOnOverlay);
  document.addEventListener('keydown', closeOnEscape);
};

function closePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('mousedown', closeOnOverlay);
  document.removeEventListener('keydown', closeOnEscape);
};

// Открыть попап профиля
function openPopupProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profileInfoPopup);
  const buttonSubmit = formElementProfile.querySelector('.popup__form-save');
  buttonSubmit.classList.add('popup__form-save_disabled');
  buttonSubmit.setAttribute('disabled', true);
  hideInputError(profileInfoPopup, nameInput, validationSet);
  hideInputError(profileInfoPopup, jobInput, validationSet);
};

// Сохранить попап профиля
function submitFormHandlerProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profileInfoPopup);
};

function openPopupCardAdd() {
  openPopup(cardContentPopup);
  formElementCardContent.reset();
  const buttonSubmit = formElementCardContent.querySelector('.popup__form-save');
  buttonSubmit.classList.add('popup__form-save_disabled');
  buttonSubmit.setAttribute('disabled', true);
  hideInputError(cardContentPopup, titleInput, validationSet);
  hideInputError(cardContentPopup, linkInput, validationSet);
}

// Поставить лайк фото
function likePhoto(evt) {
  evt.target.classList.toggle('card__like_active')
};

// Удалить карточку
function removeCard(evt) {
  evt.target.closest('.card').remove()
};

// Открыть изображение
function handleImageClick(title, link) {
  photoTitle.textContent = title;
  photoLink.alt = title;
  photoLink.src = link;
  openPopup(popupImage)
}

// Клонировать шаблон карточки
const cardsTemplate = document.querySelector('#tmpl-cards').content;
const cardList = document.querySelector('.cards');

function cloneCardTemplate(item) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')

  cardElement.querySelector('.card__title').textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener('click', function () {
    handleImageClick(item.name, item.link)
  });

  const likeCardButton = cardElement.querySelector('.card__like');
  const deleteCardButton = cardElement.querySelector('.card__delete');

  likeCardButton.addEventListener('click', likePhoto);
  deleteCardButton.addEventListener('click', removeCard);

  return cardElement
};

// Получить шаблон для карточки
function receiveCard(item) {
  const newCard = cloneCardTemplate(item);
  cardList.prepend(newCard)
};

// Добавить массив карточек
initialCards.forEach(getInitialCards => {
  receiveCard(getInitialCards)
});

// Создать карточку
const cardTitle = document.querySelector('.popup__form-input_info_title');
const cardLink = document.querySelector('.popup__form-input_info_link');

function submitFormHandlerCard(evt) {
  evt.preventDefault();
  receiveCard({
    name: cardTitle.value,
    link: cardLink.value
  });
  
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