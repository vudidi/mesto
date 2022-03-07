export class Card {
  constructor({
    data,
    handleCardClick
  }, cardTemplateSelector) {
    this._title = data.title;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._template = cardTemplateSelector;
  }

  // получить шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content
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

    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._link;

    return this._element;
  }

  // Слушатели
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link)
    });
    this._likeCardButton.addEventListener('click', this._likePhoto);
    this._deleteCardButton.addEventListener('click', this._removeCard);
  }

  // Поставить лайк фото
  _likePhoto = () => {
    this._likeCardButton.classList.toggle('card__like_active')
  }

  // Удалить карточку
  _removeCard = () => {
    this._element.remove();
    this._element = null;
  }

}