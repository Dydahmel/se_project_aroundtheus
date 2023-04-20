import { modalImage, modalCaption} from "./index.js";
import Popup from "./Popup";

export default class PopupImage extends Popup{
    constructor(popupSelector){
        super({popupSelector});
        this._popupImageEl = this._popupElement  
    }
    open(){
        super.open();
        this._popupElement.src = modalImage.src;
        this._popupElement.name = modalImage.alt;
        this._popupElement.name = modalCaption.textContent;
    }
    close(){
        super.close()
    }
}