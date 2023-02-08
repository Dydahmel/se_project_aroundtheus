


function setEventListeners(formEl, config){
    const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
    inputEls.forEach(inputEl => {
        inputEl.addEventListener('input', (evt) =>{            
            checkValidity(formEl, inputEl, config)            
        })


    })
};


function showInputError(formEl, inputEl, config){
    const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(config.inputErrorClass);
    errorMessage.textContent = inputEl.validationMessage;
    errorMessage.classList.add(config.errorClass);
}



function checkValidity(formEl, inputEl, config){
    if(!inputEl.validity.valid){
        showInputError(formEl, inputEl, config)
    }
    else{
        hideInputError(formEl, inputEl, config)
    }
}



function enableValidation(options){
    const formEls = Array.from(document.querySelectorAll(config.formSelector))
    console.log(formEls)
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDeatful()
        })
        setEventListeners(formEl, config)  
    });
};


//selectors for validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}; 

enableValidation()