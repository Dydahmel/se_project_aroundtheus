import Popup from "./Popup";

export default class PopupImage extends Popup{
    constructor(popupSelector){
        super({popupSelector});
        this._popupImageEl = this._popupElement.querrySelector('.modal__image');        
    }
    open(){

    }
    close(){
        
    }
}