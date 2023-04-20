//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup } from "./utils.js";
import { config, initialCards } from "./constants.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import "../pages/index.css";
import PopupImage from "./PopupImage.js";
import PopupForm from "./PopupForm.js";

const popupImage = new PopupImage("#card__image-modal");
popupImage.setEventListeners();

function renderCard({item}){
   new Card(item, "#card__template", handleImageClick).getView();
}




const popupAddForm = new PopupForm("#profile__add-modal", (event) => {
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;
  const card = new Card({ name, link }, "#card__template", handleImageClick).getView();
  cardSection.addItem(card); 
  popupAddForm.close();
})
popupAddForm.setEventListeners();


const profileAddBtn = document.querySelector("#profile__add-button");

profileAddBtn.addEventListener("click", () => popupAddForm.open());



function handleImageClick(){
  popupImage.open()
}





const cardSection = new Section({
  data: initialCards,
  renderer: (item) =>{
    const card = new Card(item, "#card__template", handleImageClick).getView();    
    cardSection.addItem(card);    
  }  
}, config.cardSectionClass);

cardSection.renderItems()

const profileEditBtn = document.querySelector("#profile__edit-btn");
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
const allModals = document.querySelectorAll(".modal");



function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditModal);
}

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditModal);
});



profileEditForm.addEventListener("submit", handleProfileFormSubmit);





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
