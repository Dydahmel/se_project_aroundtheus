
class FormValidator{
    constructor(config, formElement){
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._buttonEl = this._formElement.querySelector(this._submitButtonSelector);
        this._inputEls = [...this._formElement.querySelectorAll(this._inputSelector)];
        
        
    };

    _setEventListeners(){
        this._inputEls.forEach(inputEl => {
            inputEl.addEventListener('input', () =>{                
                this._checkValidity(inputEl)
                this._toggleSubmitBtn(inputEl)            
        });

        //reset "event"
        this._formElement.addEventListener("reset", () => {
            // `setTimeout` is needed to wait till the form is fully reset and then to call `toggleButtonState`
            setTimeout(() => {
             this._toggleSubmitBtn(inputEl)  
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



    _toggleSubmitBtn(){ 
        if(this._hasInvalidInput()){
            this._disableSubmitBtn();
        }
        else{
            this._enableSubmitBtn()
        }
    }

    _hasInvalidInput(){
        return !this._inputEls.every((inputEl) => inputEl.validity.valid)
    };

    _disableSubmitBtn(){
        this._buttonEl.classList.add(this._inactiveButtonClass);
        this._buttonEl.disabled = true;
    }

    _enableSubmitBtn(){
        this._buttonEl.classList.remove(this._inactiveButtonClass);
        this._buttonEl.disabled = false;
    }


    enableValidation(){        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
};



export default FormValidator;