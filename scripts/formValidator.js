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
        test()
    }

    enableValidation(){        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        _setEventListeners();
    }

    

    
    

    
}

//const profileEditModal = document.querySelector('#profile__edit-modal');
//const profileAddModal = document.querySelector('#profile__add-modal');


export default FormValidator;