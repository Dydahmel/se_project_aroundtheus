import {FormValidator, config} from './FormValidator.js'
import Card from './Card.js';
import { openPopup, closePopup } from './utils.js';


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



const profileEditBtn = document.querySelector('#profile__edit-btn');
const profileEditModal = document.querySelector('#profile__edit-modal');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('#profile__title-input');
const profileJobInput = document.querySelector('#profile__subtitle-input');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');

const profileAddModal = document.querySelector('#profile__add-modal');
const profileAddBtn = document.querySelector('#profile__add-button');
const addCardForm = profileAddModal.querySelector('.modal__form');

const imageModal = document.querySelector('#card__image-modal');
const modalImageEl = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector('.modal__image-caption');
const allModals = document.querySelectorAll('.modal');


initialCards.forEach((cardData)  => {
  const cardViev = new Card(cardData).getViev();
  renderCard(cardViev, cardListEl);  
});


function renderCard(cardElement, container){  
  container.prepend(cardElement);
  
};

function handleProfileFormSubmit(event){
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditModal);
};

addCardForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;  
  const cardViev = new Card({name, link}).getViev();
  renderCard(cardViev, cardListEl);
  closePopup(profileAddModal);
  event.target.reset();  
});

profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditModal);
});


profileAddBtn.addEventListener('click', () => openPopup(profileAddModal));

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

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







const editForm = profileEditModal.querySelector(config.formSelector);
const addForm = profileAddModal.querySelector(config.formSelector);

const editFormValidation = new FormValidator(config, editForm);
const addFormValidation = new FormValidator(config, addForm);

editFormValidation.enableValidation();
addFormValidation.enableValidation();


export { 
  modalImageEl as modalImage, 
  modalImageCaption as modalCaption,
  imageModal,}
