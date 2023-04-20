import { modalImage, modalCaption, openImage } from "./index.js";
import PopupImage from "./PopupImage.js";

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardEl;
  }

  _setEventListeners() {
    this._likeBtn = this._card.querySelector("#card_like-button");
    this._deleteBtn = this._card.querySelector(".card__delete-btn");
    this._image = this._card.querySelector(".card__image");
    this._likeBtn.addEventListener("click", () => this._toggleLikeBtn());
    this._deleteBtn.addEventListener("click", () => this._removeCard());
    this._image.addEventListener("click", () => this._openImage());
  }

  _openImage() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalCaption.textContent = this._name;    
    this._handeImageClick();
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button_enabled");
  }

  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  getView() {
    this._card = this._getTemplate();
    this._setEventListeners();

    const cardEl = this._card.querySelector(".card__image");
    cardEl.src = this._link;
    cardEl.alt = this._name;
    this._card.querySelector(".card__title").textContent = this._name;

    return this._card;
  }
}

export default Card;
