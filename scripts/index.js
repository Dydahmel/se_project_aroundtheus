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
const profileCloseBtn = document.querySelector('#profile__close-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('#profile__title-input');
const profileJobInput = document.querySelector('#profile__subtitle-input');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list')
const cardTemplate = document.querySelector('#card__template').content.firstElementChild;

function closePopup(){
  profileEditModal.classList.remove('modal_opened');
}

function handleProfileFormSubmit(event){
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup();
}

function getCardElement(cardData){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardTitleEl = cardElement.querySelector('.card__title');
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  return cardElement;
}

profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditModal.classList.add('modal_opened')
})

profileCloseBtn.addEventListener('click',closePopup)

profileEditForm.addEventListener('submit', handleProfileFormSubmit);



initialCards.forEach((cardData)  => {
  const cardElement = getCardElement(cardData)
  cardListEl.append(cardElement);
})