import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__image-caption");
  }
  open(name, link) {
    super.open();    
    this._image.src = name;
    this._image.alt = link;
    this._caption.textContent = link;
  }
}
