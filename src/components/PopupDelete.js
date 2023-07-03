import Popup from "./Popup";
export default class PopupDelete extends Popup{
    constructor(popupSelector){
        super({popupSelector})
        this._submitBtn = this._popupElement.querySelector(".modal__save-button");        
               
    }

    setSubmitAction(handleDelete){
        this._handleDelete = handleDelete
    }

    setEventListeners(){
        super.setEventListeners()
        this._submitBtn.addEventListener("mousedown", () => {
            this._handleDelete();
            console.log('button is working')
        });
    }    
};