import Popup from "./Popup";

export default class PopupForm extends Popup{
    constructor(popupSelector, handleSubmit){
      super({popupSelector});
      this._popupFormEl = this._popupElement.querrySelector('.modal__form');
      this._handleSubmit = handleSubmit;
    }
    close(){
        this._popupFormEl.reset();
        super.close();

    }
}