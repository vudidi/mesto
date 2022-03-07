import {
    Popup
} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({handleFormSubmit}, popupSelector) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__form-input');

        this._formValues = {};
        
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;        
    }       
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());   
            this.close()         
        })
    }

    close() {        
        super.close();
        this._form.reset();
    }

}