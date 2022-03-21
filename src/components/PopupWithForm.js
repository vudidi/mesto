import {
    Popup
} from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({handleFormSubmit}, popupSelector) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('.popup__form-button');
        this._inputList = this._form.querySelectorAll('.popup__form-input');
    }

    changeHandleSubmit(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler
    }

    _getInputValues() {
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
        })
    }

    close() {        
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading, buttonText) {
        if (isLoading) { 
            this._button.textContent = 'Сохранение...'      
          } else {       
            this._button.textContent = buttonText;
          }
    }

}