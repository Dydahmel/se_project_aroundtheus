//selectors for validation
const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button-disabled",
    inputErrorClass: ".modal__input-type-error",
    errorClass: ".modal__error_visible"
  }; 



function showInputError(formEl, inputEl, config){
    const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(config.inputErrorClass);
    errorMessage.textContent = inputEl.validationMessage;
    errorMessage.classList.add(config.errorClass);
};

function hideInputError(formEl, inputEl, config){
    const errorMessage = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(config.inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(config.errorClass)

};

function checkValidity(formEl, inputEl, config){
    if(!inputEl.validity.valid){
        showInputError(formEl, inputEl, config)
    }
    else{
        hideInputError(formEl, inputEl, config)
    }
};

function hasInvalidInput(inputList){
    return !inputList.every((inputEl) => inputEl.validity.valid)
};

function disableSubmitBtn(buttonEl, config){
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
};

function enableSubmitBtn(buttonEl, config){
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
}

function toggleSubmitBtn(inputEls, buttonEl, config){ 
    if(hasInvalidInput(inputEls)){
        disableSubmitBtn(buttonEl, config);
    }
    else{
        enableSubmitBtn(buttonEl, config)
    }
};


function enableValidation(config){
    const formEls = Array.from(document.querySelectorAll(config.formSelector))
       
    formEls.forEach((formEl) => {
        formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();            
        })
        setEventListeners(formEl, config)  
    });
};

function setEventListeners(formEl, config){
    const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonEl = formEl.querySelector(config.submitButtonSelector)
    inputEls.forEach(inputEl => {
        inputEl.addEventListener('input', (evt) =>{            
            checkValidity(formEl, inputEl, config)
            toggleSubmitBtn(inputEls, buttonEl, config)            
        });

        //reset "event"
        formEl.addEventListener("reset", () => {
            // `setTimeout` is needed to wait till the form is fully reset and then to call `toggleButtonState`
            setTimeout(() => {
             toggleSubmitBtn(inputEls, buttonEl, config)  
            }, 0); 
          });
    });
};

enableValidation(config)

