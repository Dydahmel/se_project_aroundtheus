export default class PopupImage extends Popup{
    constructor(popupSelector, handleSubmit){
        super({popupSelector});
        this._popupImageEl = this._popupElement.querrySelector('.modal__image');
        this._handleSubmit = handleSubmit;
    }