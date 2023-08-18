export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    userId,
    handleLikeClick
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._handleLikeClick = handleLikeClick;
    this._likeArr = data.likes;
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
    this._likeCounter = this._card.querySelector(".card__like_counter");
    //new way to pass data outside of the class
    this._likeBtn.addEventListener("click", () => {
      this._toggleLikeBtn(), this._handleLikeClick(this._id, this);
    });
    this._deleteBtn.addEventListener("click", () =>
      this._handleDeleteClick(this._id, this)
    );
    this._image.addEventListener("click", () => this._openImage());
  }

  _openImage() {
    this._handleImageClick(this._link, this._name);
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button_enabled");
  }

  isLiked() {
    return this._likeArr.some(({ _id }) => {
      return _id === this._userId;
    });
  }

  _renderLikesCounter() {
    this._likeCounter.textContent = this._likeArr.length;
  }

  updateLikesCounter(likes) {
    this._likeArr = likes;
    this._renderLikesCounter();
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
    //i cannot move this line to the class constructor, it gets undefined
    this._card.querySelector(".card__title").textContent = this._name;
    //check if user and owner ID matches
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
    if (this.isLiked()) {
      this._toggleLikeBtn();
    }
    this._renderLikesCounter();

    return this._card;
  }
}
