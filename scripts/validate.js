 function showInputError(formElement, inputElement, errorMessage, {
   inputErrorClass,
   errorClass
 }) {
   const formError = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.add(inputErrorClass);
   formError.classList.add(errorClass);
   formError.textContent = errorMessage;
 };

 function hideInputError(formElement, inputElement, {
   inputErrorClass,
   errorClass
 }) {
   const formError = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(inputErrorClass);
   formError.classList.remove(errorClass);
   formError.textContent = "";
 };

 function toggleButtonState(formElement, {
   submitButtonSelector,
   inactiveButtonClass
 }) {
   const buttonSubmit = formElement.querySelector(submitButtonSelector)
   const formIsValid = formElement.checkValidity()

   if (formIsValid) {
     buttonSubmit.classList.remove(inactiveButtonClass);
     buttonSubmit.removeAttribute('disabled');
   } else {
     buttonSubmit.classList.add(inactiveButtonClass);
     buttonSubmit.setAttribute('disabled', true);
   }
 };

 function isValid(formElement, inputElement, rest) {
   if (!inputElement.validity.valid) {
     showInputError(formElement, inputElement, inputElement.validationMessage, rest);
   } else {
     hideInputError(formElement, inputElement, rest);
   }
   toggleButtonState(formElement, rest);
 };

 function enableValidation({
   formSelector,
   inputSelector,
   ...rest
 }) {
   const formList = document.querySelectorAll(formSelector);

   formList.forEach((formElement) => {
     formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
       toggleButtonState(formElement, rest);
     });

     const inputList = formElement.querySelectorAll(inputSelector);

     inputList.forEach((inputElement) => {
       inputElement.addEventListener('input', () => {
         isValid(formElement, inputElement, rest);
       })
     });
   });
 };

 const validationSet = {
   formSelector: '.popup__form',
   inputSelector: '.popup__form-input',
   submitButtonSelector: '.popup__form-save',
   inactiveButtonClass: 'popup__form-save_disabled',
   inputErrorClass: 'popup__form-input_type_error',
   errorClass: 'popup__error_visible'
 }

 enableValidation(validationSet);