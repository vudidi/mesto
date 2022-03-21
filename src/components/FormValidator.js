export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._buttonSubmit = this._form.querySelector(this._settings.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        const formError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        formError.classList.add(this._settings.errorClass);
        formError.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const formError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        formError.classList.remove(this._settings.errorClass);
        formError.textContent = "";
    }

    _toggleButtonState() {
        this._formIsValid = this._form.checkValidity();
        if (this._formIsValid) {
            this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
            this._buttonSubmit.removeAttribute('disabled');
        } else {
            this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
            this._buttonSubmit.setAttribute('disabled', true);
        }
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
        this._toggleButtonState();
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
            })
        })
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
    }

    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement) 
        });
      }
}