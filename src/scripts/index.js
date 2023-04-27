//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

import { config, initialCards } from "./constants.js";
import Section from "./Section.js";
import "../pages/index.css";
import PopupImage from "./PopupImage.js";
import PopupForm from "./PopupForm.js";
import UserInfo from "./UserInfo.js";

const popupImage = new PopupImage("#card__image-modal");
popupImage.setEventListeners();

function renderCard(item){
   const card = new Card(item, "#card__template", handleImageClick).getView();
   cardSection.addItem(card);
}




const popupAddForm = new PopupForm("#profile__add-modal", (inputValues) => {  
  renderCard(inputValues)
  popupAddForm.close();
})
popupAddForm.setEventListeners();

const popupEditForm = new PopupForm("#profile__edit-modal", (inputValues) => {
  console.log(inputValues);
  new UserInfo(inputValues).setUserInfo();  
  popupEditForm.close();
});
popupEditForm.setEventListeners();

const currentUser = new UserInfo().getUserInfo()

console.log(currentUser.title)


const profileAddBtn = document.querySelector("#profile__add-button");
const profileEditBtn = document.querySelector("#profile__edit-btn");

profileAddBtn.addEventListener("click", () => popupAddForm.open());
profileEditBtn.addEventListener("click", () => {
  popupEditForm.open()
  new UserInfo().getUserInfo()  
})




function handleImageClick(){
  popupImage.open()
}

const cardSection = new Section({
  data: initialCards,
  renderer: (item) =>{
    renderCard(item)    
  }  
}, config.cardSectionClass);

cardSection.renderItems()


const profileEditModal = document.querySelector("#profile__edit-modal");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const profileNameInput = document.querySelector("#profile__title-input");
const profileJobInput = document.querySelector("#profile__subtitle-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

const profileAddModal = document.querySelector("#profile__add-modal");

const addCardForm = profileAddModal.querySelector(".modal__form");

const imageModal = document.querySelector("#card__image-modal");
const modalImageEl = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector(".modal__image-caption");










const editForm = profileEditModal.querySelector(config.formSelector);
const addForm = profileAddModal.querySelector(config.formSelector);

const editFormValidation = new FormValidator(config, editForm);
const addFormValidation = new FormValidator(config, addForm);


editFormValidation.enableValidation();
addFormValidation.enableValidation();





export {
  modalImageEl as modalImage,
  modalImageCaption as modalCaption,
  imageModal, 
  cardSection
};
