//selectors for validation
const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button-disabled",
    inputErrorClass: ".modal__input-type-error",
    errorClass: ".modal__error_visible"
}; 
const test = ()  =>{
    console.log('its working')
}



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
        const inputEls = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonEl = this._formElement.querySelector(this._submitButtonSelector)
        inputEls.forEach(inputEl => {
            inputEl.addEventListener('input', () =>{                
                this._checkValidity(inputEl)
                this._toggleSubmitBtn(inputEls, buttonEl)            
        });

        //reset "event"
        this._formElement.addEventListener("reset", () => {
            // `setTimeout` is needed to wait till the form is fully reset and then to call `toggleButtonState`
            setTimeout(() => {
             this._toggleSubmitBtn(inputEls, buttonEl)  
            }, 0); 
          });
    });
    }

    _checkValidity(inputEl){
        //taking inputEl from event liseners
        if(!inputEl.validity.valid){
            this._showInputError(inputEl)
        }
        else{
            this._hideInputError(inputEl)
        }
    }

    _showInputError(inputEl){
        const errorMessage = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessage.textContent = inputEl.validationMessage;
        errorMessage.classList.add(this._errorClass);
    }

    _hideInputError(inputEl){
        const errorMessage = this._formElement.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass)    
    }

    _toggleSubmitBtn(inputEls, buttonEl){ 
        if(this._hasInvalidInput(inputEls)){
            this._disableSubmitBtn(buttonEl);
        }
        else{
            this._enableSubmitBtn(buttonEl)
        }
    }

    _hasInvalidInput(inputList){
        return !inputList.every((inputEl) => inputEl.validity.valid)
    };

    _disableSubmitBtn(buttonEl){
        buttonEl.classList.add(this._inactiveButtonClass);
        buttonEl.disabled = true;
    }

    _enableSubmitBtn(buttonEl){
        buttonEl.classList.remove(this._inactiveButtonClass);
        buttonEl.disabled = false;
    }


    enableValidation(){        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
};



export default FormValidator;