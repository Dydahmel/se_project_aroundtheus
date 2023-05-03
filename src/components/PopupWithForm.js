import Popup from "./Popup";
import { config } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super({ popupSelector });    
    this._popupFormEl = this._popupElement.querySelector(config.formSelector);
    this._inputEls = this._popupFormEl.querySelectorAll(config.inputSelector);
    this._handleSubmit = handleSubmit;    
  }
  setInputValues(data) {
    this._inputEls.forEach((input) => {
      // here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupFormEl.reset();
  }  

  _getInputValues() {
    const inputValues = {};
    //get all inputs    
    //loop over all inputs
    this._inputEls.forEach((input) => {
      //assign inputs to empty object by name=value
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormEl.addEventListener("submit", () => {
      this._handleSubmit(this._getInputValues());
    });
  }
}
