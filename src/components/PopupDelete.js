import Popup from "./Popup";
export default class PoppurDelete extends Popup{
    constructor(popupSelector){
        super({popupSelector})
        this._card = this._popupElement.querySelector(".card")
    }

    setEventListeners(){
        super.setEventListeners()
    }

    
};