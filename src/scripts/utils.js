function closePopup(modal) {
  document.removeEventListener("keydown", closeModalByEsc);
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  document.addEventListener("keydown", closeModalByEsc);
  modal.classList.add("modal_opened");
}

//function openImage() {
  //openPopup(imageModal);
//}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

export { openPopup, closePopup };
