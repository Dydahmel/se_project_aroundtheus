//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { config } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import "../page/index.css";

const profileAddBtn = document.querySelector("#profile__add-button");
const profileEditBtn = document.querySelector("#profile__edit-btn");
//placeholder for section
let cardSection;
//placeholder for userInfo
let userInfo;
//placeholder for userId
let userId;

function createCard(item) {
  const cardElement = new Card(
    item,
    "#card__template",
    handleImageClick,
    handleDeleteClick,
    userId,
    handleLikeClick
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

function handleDeleteClick(cardId){  
  popupDelete.open()
  popupDelete.setSubmitAction( () =>{
    api.deleteCard(cardId).then( () => {      
      this.removeCard()
      popupDelete.close()
    })
  })  
}

function handleLikeClick(cardId){  
  if(this._likeBtn.classList.contains("card__like-button_enabled")){
    api.addLike(cardId)    
  }
  else{
    api.removeLike(cardId)
  }

}





//new inst of API(set options)
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((res) => {
  //assign new value for userId
  userId = res._id;  
  //new UserInfo 
  userInfo = new UserInfo({
    title: ".profile__title",
    subtitle: ".profile__subtitle",
  });
  //setting userInfo from server
  userInfo.setUserInfo(res)
})

// loaded cards from server
api.getInitialCards().then((res) => {
  //new section
  cardSection = new Section(
    {
      //using data from server
      data: res,
      renderer: (item) => {
        renderCard(item);
      },
    },
    config.cardSectionClass
  );
  cardSection.renderItems();
});


const popupEditForm = new PopupWithForm(
  "#profile__edit-modal",
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    //updating userInfo (on?at?in) server
    api.updateUserInfo(inputValues)
    popupEditForm.close();
  }
);



const popupDelete = new PopupDelete("#card__delete-modal");

const popupImage = new PopupWithImage("#card__image-modal");

const popupAddForm = new PopupWithForm("#profile__add-modal", (inputValues) => {
  api.addNewCard(inputValues).then((data) => {renderCard(data); console.log(data)})  
  popupAddForm.close();
});






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
popupDelete.setEventListeners();
profileAddBtn.addEventListener("click", () => popupAddForm.open());
profileEditBtn.addEventListener("click", () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
});


console.log(userId)