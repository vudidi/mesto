export class Popup {
    constructor(
        popupSelector
    ) {
        this._popupSelector = popupSelector
        this._popup = document.querySelector(this._popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close');        
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.addEventListener('mousedown', this._closeOnOverlay.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.removeEventListener('mousedown', this._closeOnOverlay.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _closeOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close()
        }
    }

    setEventListeners() {        
        this._buttonClose.addEventListener('click', () => {
            this.close()
        })
    }
}