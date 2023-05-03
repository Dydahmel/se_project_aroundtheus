//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { config, initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../page/index.css";

const profileAddBtn = document.querySelector("#profile__add-button");
const profileEditBtn = document.querySelector("#profile__edit-btn");

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card__template",
    handleImageClick
  ).getView();
  return cardElement;
}

function renderCard(item) {
  const card = createCard(item);
  cardSection.addItem(card);
}

function handleImageClick(name, link) {
  popupImage.open(name, link);
}

const userInfo = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
});

const popupImage = new PopupWithImage("#card__image-modal");

const popupAddForm = new PopupWithForm("#profile__add-modal", (inputValues) => {
  renderCard(inputValues);
  popupAddForm.close();
});

const popupEditForm = new PopupWithForm(
  "#profile__edit-modal",
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupEditForm.close();
  }
);

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

const formValidators = {};

// enable validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");

    // here you store a validator by the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

profileAddBtn.addEventListener("click", () => popupAddForm.open());
profileEditBtn.addEventListener("click", () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
});
