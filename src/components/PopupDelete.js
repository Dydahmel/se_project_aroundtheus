import Popup from "./Popup";
export default class PoppurDelete extends Popup{
    constructor(popupSelector, handleDelete){
        super({popupSelector})
        this._submitBtn = this._popupElement.querySelector(".modal__save-button") 
        this._handleDelete = handleDelete;       
    }

    setEventListeners(){
        super.setEventListeners()
        this._submitBtn.addEventListener("mousedown", () => {
            this._handleDelete();
            console.log('button is working')
        });
    }

    
};