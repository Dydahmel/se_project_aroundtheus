//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { config, initialCards } from "./constants.js";
import Section from "./Section.js";
import PopupImage from "./PopupImage.js";
import PopupForm from "./PopupForm.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";

const imageModal = document.querySelector("#card__image-modal");
const profileAddModal = document.querySelector("#profile__add-modal");
const profileEditModal = document.querySelector("#profile__edit-modal");

const profileNameInput = document.querySelector("#profile__title-input");
const profileJobInput = document.querySelector("#profile__subtitle-input");

const profileAddBtn = document.querySelector("#profile__add-button");
const profileEditBtn = document.querySelector("#profile__edit-btn");

const modalImageEl = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector(".modal__image-caption");

const editForm = profileEditModal.querySelector(config.formSelector);
const addForm = profileAddModal.querySelector(config.formSelector);

function renderCard(item) {
  const card = new Card(item, "#card__template", handleImageClick).getView();
  cardSection.addItem(card);
}

function handleImageClick() {
  popupImage.open();
}

const userInfo = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
});

const popupImage = new PopupImage("#card__image-modal");

const popupAddForm = new PopupForm("#profile__add-modal", (inputValues) => {
  renderCard(inputValues);
  popupAddForm.close();
});

const popupEditForm = new PopupForm("#profile__edit-modal", (inputValues) => {
  userInfo.setUserInfo(inputValues);
  popupEditForm.close();
});

const cardSection = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      renderCard(item);
    },
  },
  config.cardSectionClass
);
cardSection.renderItems();

const editFormValidation = new FormValidator(config, editForm);
const addFormValidation = new FormValidator(config, addForm);

popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
editFormValidation.enableValidation();
addFormValidation.enableValidation();

profileAddBtn.addEventListener("click", () => popupAddForm.open());
profileEditBtn.addEventListener("click", () => {
  popupEditForm.open();
  profileNameInput.value = userInfo.getUserInfo().title;
  profileJobInput.value = userInfo.getUserInfo().subtitle;
});

export { modalImageEl as modalImage, modalImageCaption as modalCaption };
