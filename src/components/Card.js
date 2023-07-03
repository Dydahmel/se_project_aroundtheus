export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._deleteBtn.addEventListener("click", () => this._handleDeleteClick(this._id));
    this._image.addEventListener("click", () => this._openImage());
  }

  _openImage() {
    this._handeImageClick(this._link, this._name);
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button_enabled");
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  getView() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._card.querySelector(".card__title").textContent = this._name;

    return this._card;
  }
}
