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

// Открыть попап и Закрыть попап. Общие
function openPopup(element) {
  element.classList.add('popup_opened')
};

function closePopup(element) {
  element.classList.remove('popup_opened')
};

// Открыть попап карточки
function openPopupCardContent() {
  cardTitle.value = "";
  cardLink.value = "";
  openPopup(cardContentPopup)
}

// Открыть попап профиля
function openPopupProfileInfo() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profileInfoPopup);
};

// Сохранить попап профиля
function submitFormHandlerProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profileInfoPopup)
};

// Слушатели
buttonEditProfile.addEventListener('click', openPopupProfileInfo);
buttonCloseProfile.addEventListener('click', () => closePopup(profileInfoPopup));
buttonAddCard.addEventListener('click', openPopupCardContent);
buttonCloseCardContent.addEventListener('click', () => closePopup(cardContentPopup));

// Поставить лайк фото
function likePhoto(e) {
  e.target.classList.toggle('card__like_active')
};

// Удалить карточку
function removeCard(e) {
  e.target.closest('.card').remove()
};

// Открыть изображение
function handleImageClick(title, link) {
  photoTitle.textContent = title;
  photoLink.src = link;
  openPopup(popupImage)
}

// Клонировать шаблон карточки
const cardsTemplate = document.querySelector('#tmpl-cards').content;
const cardList = document.querySelector('.cards');

function cloneCardTemplate(item) {
  const cardElement = cardsTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;

  cardElement.querySelector('.card__image').addEventListener('click', function () {
    handleImageClick(item.name, item.link)
  })
  buttonClosepopupImage.addEventListener('click', () => closePopup(popupImage));

  const likeCardButton = cardElement.querySelector('.card__like');
  const deleteCardButton = cardElement.querySelector('.card__delete');

  formElementProfile.addEventListener('submit', submitFormHandlerProfile);
  formElementCardContent.addEventListener('submit', submitFormHandlerCard);
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