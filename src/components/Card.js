export class Card {
  constructor({
    data,
    handleCardClick,
    handleDeleteClick,
    handleToggleLike
  }, cardTemplateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._handleCardClick = handleCardClick;
    this._template = cardTemplateSelector;
    this._handleToggleLike = handleToggleLike;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerId = data.ownerId,
      this._userId = data.userId
  }

  // Получить шаблон карточки
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
    this._likeCardButton = this._element.querySelector('.card__like-icon');
    this._deleteCardButton = this._element.querySelector('.card__delete');
    this._likesCount = this._element.querySelector('.card__like-count');

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    if (this._ownerId !== this._userId) {
      this._deleteCardButton.style.display = 'none';
    }

    this.setLikes(this._likes);

    return this._element;
  }

  // Проверить лайк пользователя
  isLiked() {
    const isLikedCard = this._likes.find(user => user._id === this._userId)
    return isLikedCard
  }

  // Установить лайки
  setLikes(currentLikes) {
    this._likes = currentLikes;    
    this._likesCount.textContent = this._likes.length;    

    if (this.isLiked()) {
      this.addLike()
    } else {
      this.deleteLike()
    }
  }

  // Слушатели
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._likeCardButton.addEventListener('click', () => {
      this._handleToggleLike(this._id)
    });

    this._deleteCardButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

  // Поставить лайк фото
  addLike = () => {
    this._likeCardButton.classList.add('card__like-icon_active')
  }

  // Удалить лайк фото
  deleteLike = () => {
    this._likeCardButton.classList.remove('card__like-icon_active')
  }

  // Удалить карточку
  removeCard = () => {
    this._element.remove();
    this._element = null;
  }

}