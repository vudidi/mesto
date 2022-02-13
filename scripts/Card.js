import {
  photoTitle,
  photoLink,
  popupImage,
  openPopup
} from './index.js'

export class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplateSelector).content;
  }

  // получить шаблон карточки
  _getTemplate() {
    const cardElement = this._template
      .querySelector('.card')
      .cloneNode(true);
    return (cardElement);
  }

  // Наполнить шаблон карточки контентом
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeCardButton = this._element.querySelector('.card__like');
    this._deleteCardButton = this._element.querySelector('.card__delete');

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._element;
  }

  // Слушатели
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link)
    });
    this._likeCardButton.addEventListener('click', this._likePhoto);
    this._deleteCardButton.addEventListener('click', this._removeCard);
  }

  // Открыть изображение
  _handleImageClick() {
    photoTitle.textContent = this._name;
    photoLink.alt = this._name;
    photoLink.src = this._link;
    openPopup(popupImage);
  }

  // Поставить лайк фото
  _likePhoto(evt) {
    evt.target.classList.toggle('card__like_active')
  }

  // Удалить карточку
  _removeCard(evt) {
    evt.target.closest('.card').remove()
  }

}