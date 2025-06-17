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
const imagePopupImage = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");

const cards = document.querySelector(".places__list");
initialCards.forEach(function (item) {
  const newcard = addCard(item, deleteFunction, likeFunction, openImagePopup);
  cards.append(newcard);
});

function openImagePopup(cardData) {
  openModal(popupImage);
  imagePopupImage.src = cardData.link;
  imagePopupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
}

popups.forEach(function (popup) {
  popup.classList.add("popup_is-animated");
  popup.querySelector(".popup__close").addEventListener("click", closeModal);
  popup.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt);
    }
  });
});

const formEdit = document.forms.edit_profile;
const name = formEdit.elements.name;
const description = formEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

buttonEdit.addEventListener("click", function () {
  name.value = profileTitle.textContent;
  description.value = profileJob.textContent;
  openModal(popupEdit);
});
buttonNew.addEventListener("click", function () {
  openModal(popupNew);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

   profileTitle.textContent = name.value;
   profileJob.textContent = description.value;

  closeModal();
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

  const newcard = addCard(newplace, deleteFunction, likeFunction, openImagePopup);
  cards.prepend(newcard);

  formAdd.reset();

  closeModal();
}

formAdd.addEventListener("submit", handleAddFormSubmit);