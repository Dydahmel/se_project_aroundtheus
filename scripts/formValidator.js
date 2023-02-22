//selectors for validation
const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button-disabled",
    inputErrorClass: ".modal__input-type-error",
    errorClass: ".modal__error_visible"
  }; 


class FormValidator{
    constructor(config, formElement){
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    };



    _setEventListeners(){
        this._inputEls = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonEl = this._formElement.querySelector(this._submitButtonSelector);
        this._inputEls.forEach(inputEl => {
            inputEl.addEventListener('input', () =>{            
                this.checkValidity(inputEl)
                this._toggleSubmitBtn()            
            });
    
            //reset "event"
            this._formElement.addEventListener("reset", () => {
                // `setTimeout` is needed to wait till the form is fully reset and then to call `toggleButtonState`
                setTimeout(() => {
                this._toggleSubmitBtn()  
                }, 0); 
             });
        });

    };

    _toggleSubmitBtn(){ 
        if(_hasInvalidInput(this._inputEls)){
            this._buttonEl.classList.add(this._inactiveButtonClass);
            this._buttonEl.disabled = true;;
        }
        else{
            this._buttonEl.classList.remove(this._inactiveButtonClass);
            this._buttonEl.disabled = false;
        }
    };

    _hasInvalidInput(){
        this._inputEls.every((inputEl) => inputEl.validity.valid);
    };


    showInputError(inputEl){
        const errorMessage = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessage.textContent = inputEl.validationMessage;
        errorMessage.classList.add(this._errorClass);
    };

    hideInputError(inputEl){
        const errorMessage = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass);    
    };

    checkValidity(inputEl){
        if(!inputEl.validity.valid){
            showInputError(inputEl)
        }
        else{
            hideInputError(inputEl)
        }
    };

    enableValidation(){
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        _setEventListeners(formElement, config);
    }
}

//const profileEditModal = document.querySelector('#profile__edit-modal');
//const profileAddModal = document.querySelector('#profile__add-modal');

const editFormValidation = new FormValidator(config, profileEditModal);
const addFormValidation = new FormValidator(config, profileAddModal);


editFormValidation;
addFormValidation;

