import Popup from "./Popup";
export default class PopupDelete extends Popup{
    constructor(popupSelector, handleDelete){
        super({popupSelector})
        this._submitBtn = this._popupElement.querySelector(".modal__save-button");        
        this._handleDelete = handleDelete;       
    }

    open(cardId){
        super.open()
        this._cardId = cardId
    }

    setEventListeners(){
        super.setEventListeners()
        this._submitBtn.addEventListener("mousedown", () => {
            this._handleDelete(this._cardId);
            console.log('button is working')
        });
    }    
};