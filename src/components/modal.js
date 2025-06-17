function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closeModal() {
  document.querySelector('.popup_is-opened').classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closeModal();
  }
}

export { openModal, closeModal };
