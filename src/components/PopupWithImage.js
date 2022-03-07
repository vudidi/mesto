import {
    Popup
} from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popup = document.querySelector(popupSelector);
        this._photoTitle = this._popup.querySelector('.popup-photo__title');
        this._photoLink = this._popup.querySelector('.popup-photo__link');
    }

    open(name, link) {
        super.open();
        this._photoTitle.textContent = name;
        this._photoLink.alt = name;
        this._photoLink.src = link;
    }
    
}