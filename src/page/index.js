//but why we cannot just use TAB indentation on code formatting? why it should be double space?
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { config, initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import "../page/index.css";

const profileAddBtn = document.querySelector("#profile__add-button");
const profileEditBtn = document.querySelector("#profile__edit-btn");
const profileAvatarBtn = document.querySelector("#profile__avatar-btn");
const profileAvatar = document.querySelector(".profile__picture");

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

function handleDeleteClick(cardId, card) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        popupDelete.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeClick(cardId, card) {
  if (card.isLiked()) {
    api
      .removeLike(cardId)
      .then((res) => {
        card.updateLikesCounter(res.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        card.updateLikesCounter(res.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
// universal function for submit with request, popup instance and optional loading text
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // We need to close only in `then`
      popupInstance.close();
    })
    // we need to catch possible errors
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleProfileFormSubmit(inputValues, profilePopup) {
  // we create a function that returns a promise
  function makeRequest() {
    // `return` lets us use a promise chain `then, catch, finally` inside `handleSubmit`
    return api.updateUserInfo(inputValues).then((responce) => {
      userInfo.setUserInfo(responce);
    });
  }
  // Here we call the function passing the request, popup instance and if we need some other loading text we can pass it as the 3rd argument
  handleSubmit(makeRequest, profilePopup);
}

function handleAvatarFormSubmit(inputValues, profilePopup) {
  function makeRequest() {
    //i've tried to get my avatar updated with the same api-method as i update userInfo, but it requiers "name" wich i dont recieve from input
    return api.updateProfilePicture(inputValues).then((responce) => {
      userInfo.setUserInfo(responce);
    });
  }
  handleSubmit(makeRequest, profilePopup);
}

function handleCardFormSubmit(inputValues, profilePopup) {
  function makeRequest() {
    return api.addNewCard(inputValues).then((responce) => {
      renderCard(responce);
    });
  }
  handleSubmit(makeRequest, profilePopup);
}

//new inst of API(set options)
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo = new UserInfo({
      title: ".profile__title",
      subtitle: ".profile__subtitle",
      avatar: ".profile__picture",
    });
    userInfo.setUserInfo(userData);
    //new Section
    cardSection = new Section(
      {
        //using data from server
        data: initialCards,
        renderer: (item) => {
          renderCard(item);
        },
      },
      config.cardSectionClass
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

const popupEditForm = new PopupWithForm(
  "#profile__edit-modal",
  (inputValues) => {
    handleProfileFormSubmit(inputValues, popupEditForm);
  }
);

const popupAvatarFrom = new PopupWithForm(
  "#profile__avatar_modal",
  (inputValues) => {
    handleAvatarFormSubmit(inputValues, popupAvatarFrom);
  }
);

const popupAddForm = new PopupWithForm("#profile__add-modal", (inputValues) => {
  handleCardFormSubmit(inputValues, popupAddForm);
});

const popupDelete = new PopupDelete("#card__delete-modal");

const popupImage = new PopupWithImage("#card__image-modal");

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
popupAvatarFrom.setEventListeners();
profileAddBtn.addEventListener("click", () => popupAddForm.open());
profileEditBtn.addEventListener("click", () => {
  popupEditForm.open();
  popupEditForm.setInputValues(userInfo.getUserInfo());
});
profileAvatarBtn.addEventListener("click", () => {
  popupAvatarFrom.open();
});
