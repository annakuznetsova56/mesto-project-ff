import "../pages/index.css";
import "./cards.js";
import "../components/card.js";
import "../components/modal.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "../components/modal.js";
import { addCard, deleteFunction, likeFunction } from "../components/card.js";

const popupImage = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");

const cards = document.querySelector(".places__list");
initialCards.forEach(function (item) {
  const newcard = addCard(item, deleteFunction, likeFunction, imagePopupOpen);
  cards.append(newcard);
});

function imagePopupOpen(image) {
  openModal(popupImage);
  popupImage.querySelector(".popup__image").src = image.target.src;
  popupImage.querySelector(".popup__image").alt = image.target.alt;
  popupImage.querySelector(".popup__caption").textContent = image.target.alt;
}

popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
  popup.querySelector(".popup__close").addEventListener("click", closeModal);
});

buttonEdit.addEventListener("click", function () {
  openModal(popupEdit);
});
buttonNew.addEventListener("click", function () {
  openModal(popupNew);
});

const formEdit = document.forms.edit_profile;
const name = formEdit.elements.name;
const description = formEdit.elements.description;

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent =
    description.value;

  closeModal(evt);
}

formEdit.addEventListener("submit", handleEditFormSubmit);

const formAdd = document.forms.new_place;
const place = formAdd.elements.place_name;
const image = formAdd.elements.link;

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newplace = {
    name: place.value,
    link: image.value,
  };

  const newcard = addCard(
    newplace,
    deleteFunction,
    likeFunction,
    imagePopupOpen
  );
  cards.prepend(newcard);

  closeModal(evt);
}

formAdd.addEventListener("submit", handleAddFormSubmit);

function formReset() {
  name.value = document.querySelector(".profile__title").textContent;
  description.value = document.querySelector(
    ".profile__description"
  ).textContent;
  place.value = "";
  image.value = "";
}
formReset();
