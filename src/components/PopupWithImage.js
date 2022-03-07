import {
    Popup
} from './Popup.js'
import {
    photoTitle,
    photoLink
} from '../utils/constants.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(name, link) {
        super.open();
        photoTitle.textContent = name;
        photoLink.alt = name;
        photoLink.src = link;
    }
    
}