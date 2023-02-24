import FormValidator from './FormValidator.js'
import Card from './Card.js';




const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-disabled",
  inputErrorClass: ".modal__input-type-error",
  errorClass: ".modal__error_visible"
}; 

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
];

//const card = new Card(initialCards[0])
//card.getViev()

const profileEditBtn = document.querySelector('#profile__edit-btn');
const profileEditModal = document.querySelector('#profile__edit-modal');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('#profile__title-input');
const profileJobInput = document.querySelector('#profile__subtitle-input');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card__template').content.firstElementChild;
const profileAddModal = document.querySelector('#profile__add-modal');
const profileAddBtn = document.querySelector('#profile__add-button');
const addCardForm = profileAddModal.querySelector('.modal__form');
const addCardTitleInput = document.querySelector('card__title-input');
const addCardLinkInput = document.querySelector('card__link-input');
const imageModal = document.querySelector('#card__image-modal');
const modalImageEl = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector('.modal__image-caption');
const allModals = document.querySelectorAll('.modal');


function openImage(){
  openPopup(imageModal)
};



function closePopup(modal){  
  document.removeEventListener('keydown', closeModalByEsc);
  modal.classList.remove('modal_opened');  
};

function openPopup(modal){  
  document.addEventListener('keydown', closeModalByEsc);
  modal.classList.add('modal_opened');
};

function closeModalByEsc(evt){
  if (evt.key === "Escape"){
    const modalOpened = document.querySelector('.modal_opened');    
    closePopup(modalOpened)
  }  
};



function handleProfileFormSubmit(event){
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditModal);
};

function renderCard(cardElement, container){  
  container.prepend(cardElement);
  
};

function toggleLikeBtn(element){
  element.classList.toggle('card__like-button_enabled');
};

function removeCard(element){
  element.remove();
}

function getCardElement(cardData){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardLikeBtn = cardElement.querySelector('#card_like-button');
  const cardTitleEl = cardElement.querySelector('.card__title');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;

  cardImageEl.addEventListener('click', () =>{    
    modalImageEl.src = cardData.link;
    modalImageEl.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;
    openPopup(imageModal);
  })
  cardDeleteBtn.addEventListener('click', () => removeCard(cardElement));
  cardLikeBtn.addEventListener('click', () => toggleLikeBtn(cardLikeBtn));


  return cardElement;  
}

profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditModal);
});

// setting listeners
//listener for closing All modals by click on overlay and close buttons
allModals.forEach((modal) => {
  modal.addEventListener('mousedown', (evt) =>{
    if(evt.target.classList.contains('modal')){
      closePopup(modal);
    };
    if (evt.target.classList.contains('modal__close-button')){
      closePopup(modal)
    }
  } );  
});


profileEditForm.addEventListener('submit', handleProfileFormSubmit);

profileAddBtn.addEventListener('click', () => openPopup(profileAddModal));




addCardForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;  
  const cardViev = getCardElement({
    name,
    link
  })
  renderCard(cardViev, cardListEl);
  closePopup(profileAddModal);
  event.target.reset();  
})

initialCards.forEach((cardData)  => {
  const cardViev = new Card(cardData).getViev();
  renderCard(cardViev, cardListEl);  
});

//const editFormValidation = new FormValidator(config, profileEditModal);
//const addFormValidation = new FormValidator(config, profileAddModal);




const editForm = profileEditModal.querySelector(config.formSelector);
const addForm = profileAddModal.querySelector(config.formSelector);

const editFormValidation = new FormValidator(config, editForm);
const addFormValidation = new FormValidator(config, addForm);

editFormValidation.enableValidation();
addFormValidation.enableValidation();


export {openImage, modalImageEl as modalImage, modalImageCaption as modalCaption}
