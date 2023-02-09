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
const cardTemplate = document.querySelector('#card__template').content.firstElementChild;
const profileAddModal = document.querySelector('#profile__add-modal');
const profileAddBtn = document.querySelector('#profile__add-button');
const addCardForm = profileAddModal.querySelector('.modal__form');
const addCardTitleInput = document.querySelector('card__title-input');
const addCardLinkInput = document.querySelector('card__link-input');
const imageModal = document.querySelector('#card__image-modal');
const modalImageEl = imageModal.querySelector(".modal__image");
const modalImageCaption = imageModal.querySelector('.modal__image-caption');
const closeBtns = document.querySelectorAll('.modal__close-button');
const profileInputElements = profileEditForm.querySelectorAll('.modal__input');






function closePopup(modal){
  modal.classList.remove('modal_opened');  
};

function openPopup(modal){
  modal.classList.add('modal_opened');
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
})

closeBtns.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click',  () => closePopup(modal));
});



profileEditForm.addEventListener('submit', handleProfileFormSubmit);

profileAddBtn.addEventListener('click', () => openPopup(profileAddModal));




addCardForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  const name = event.target.title.value;
  const link = event.target.link.value;
  const button = addCardForm.querySelector(config.submitButtonSelector)
  const cardViev = getCardElement({
    name,
    link
  })
  renderCard(cardViev, cardListEl);
  closePopup(profileAddModal);
  event.target.reset();
  disableSubmitBtn(button, config)    
})

initialCards.forEach((cardData)  => {
  const cardViev = getCardElement(cardData);
  renderCard(cardViev, cardListEl);  
})