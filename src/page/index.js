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
    popupEditForm.renderLoading(true);
    //updating userInfo (on?at?in) server
    api
      .updateUserInfo(inputValues)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .then(() => {
        popupEditForm.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupEditForm.renderLoading(false);
      });
  }
);

const popupAvatarFrom = new PopupWithForm(
  "#profile__avatar_modal",
  (inputValues) => {
    popupAvatarFrom.renderLoading(true);
    api
      .updateProfilePicture(inputValues)
      .then((res) => {
        profileAvatar.src = res.avatar;
      })
      .then(() => {
        popupAvatarFrom.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupAvatarFrom.renderLoading(false);
      });
  }
);

const popupAddForm = new PopupWithForm("#profile__add-modal", (inputValues) => {
  popupAddForm.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((data) => renderCard(data))
    .then(() => {
      popupAddForm.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    });
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
