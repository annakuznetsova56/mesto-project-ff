function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", function (evt) {
      if (evt.target === evt.currentTarget) {
        closeModal(evt);
      }
    });
}

function closeModal(button) {
  button.target.closest(".popup").classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupEsc);
  }
}

export { openModal, closeModal };
