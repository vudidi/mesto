export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

    _showInputError(inputElement, errorMessage) {
        const formError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._settings.inputErrorClass);
        formError.classList.add(this._settings.errorClass);
        formError.textContent = errorMessage;
    };

    _hideInputError(inputElement) {
        const formError = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._settings.inputErrorClass);
        formError.classList.remove(this._settings.errorClass);
        formError.textContent = "";
    };

    _toggleButtonState() {
        this._buttonSubmit = this._form.querySelector(this._settings.submitButtonSelector)
        this._formIsValid = this._form.checkValidity()

        if (this._formIsValid) {
            this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
            this._buttonSubmit.removeAttribute('disabled');
        } else {
            this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
            this._buttonSubmit.setAttribute('disabled', true);
        }
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
        this._toggleButtonState();
    };

    enableValidation() {
        const formList = document.querySelectorAll(this._settings.formSelector);

        formList.forEach(() => {
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._toggleButtonState();
            });

            const inputList = this._form.querySelectorAll(this._settings.inputSelector);

            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._isValid(inputElement);
                })
            })
        })
    };

    // Деактивировать кнопку отправки формы
    disableSubmitButton() {
        this._buttonSubmit.setAttribute('disabled', true);
    };

    // Очистить ошибки для инпутов
    resetFormElements(inputElement) {
        this._hideInputError(inputElement);
        this._toggleButtonState();
    };
}