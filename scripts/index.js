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


profileEditBtn.addEventListener('click', () => {
  profileEditModal.classList.add('modal__opened')
})

profileCloseBtn.addEventListener('click', () => {
  profileEditModal.classList.remove('modal__opened')
})



