export default class Popup{
    constructor({ popupSelector}){
        this._popupElement = document.querySelector(popupSelector);
    }
    open(){
        //open popup
        this._popupElement.classList.add("modal_opened");
        document.addEventListener("keydown", this._closeByEsc)
    }
    close(){
        //close popup
        this._popupElement.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._closeByEsc)
    }
    _closeByEsc = (evt) =>{                      
            if (evt.key === "Escape") {
                this.close();
            }        
    }

    setEventListeners(){
        this._popupElement.addEventListener("mousedown", () => {
            if (this._popupElement.classList.contains("modal")) {
              this.close();
            }
            if (this._popupElement.classList.contains("modal__close-button")) {
              this.close();
            }
          });
    }
}

