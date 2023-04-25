import Popup from "./Popup";
import { config } from "./constants.js";

export default class PopupForm extends Popup{
    constructor(popupSelector, handleSubmit){
      super({popupSelector});
      this._popupElement = document.querySelector(popupSelector)
      this._popupFormEl = this._popupElement.querySelector(config.formSelector);
      this._handleSubmit = handleSubmit;
      
    }
    close(){        
        super.close();        
        this._popupFormEl.reset();

    }
    open(){
      super.open()
    }

    _getInputValues(){
      const inputValues = this._popupFormEl.querySelectorAll(config.inputSelector)
      
      inputValues.forEach((input) => {
        inputValues[input.name] = input.value        
        console.log(input.value)
      })
      return inputValues
    }

    setEventListeners(){
      super.setEventListeners()

      this._popupFormEl.addEventListener('submit', () => {
        this._handleSubmit(this._getInputValues());
      })

    }
}