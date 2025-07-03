import "../pages/index.css";
import "./cards.js";
import "../components/card.js";
import "../components/modal.js";
import "../components/validation.js";
import "../components/api.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteFunction, likeFunction } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getUserInfo, getInitialCards, editProfile, postNewCard, editAvatar } from "../components/api.js";

const popupImage = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDelete = document.querySelector(".popup_type_delete");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonNew = document.querySelector(".profile__add-button");
const buttonAvatar = document.querySelector(".profile__image_edit_button");
const popups = document.querySelectorAll(".popup");
const imagePopupImage = popupImage.querySelector(".popup__image");
const imagePopupCaption = popupImage.querySelector(".popup__caption");
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

function openImagePopup(cardData) {
  openModal(popupImage);
  imagePopupImage.src = cardData.link;
  imagePopupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
}

popups.forEach(function (popup) {
    // if(!popup.classList.contains("popup_type_delete")){
        popup.classList.add("popup_is-animated");
        popup.querySelector(".popup__close").addEventListener("click", function () {
            closeModal(popup);
        });
        popup.addEventListener("click", function (evt) {
            if (evt.target === evt.currentTarget) {
            closeModal(popup);
            }
        });
    // }
});

const formEdit = document.forms.edit_profile;
const name = formEdit.elements.name;
const description = formEdit.elements.description;
const formAdd = document.forms.new_place;
const place = formAdd.elements.place_name;
const image = formAdd.elements.link;
const formAvatar = document.forms.edit_avatar;
const avatar = formAvatar.elements.avatar_link;
const formEditSubmitButton = formEdit.querySelector('.button');
const formAddSubmitButton = formAdd.querySelector('.button');
const formAvatarSubmitButton = formAvatar.querySelector('.button');

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const cards = document.querySelector(".places__list");
export let myUserId = 0;

Promise.all([getUserInfo(), getInitialCards()])
    .then((results) => {
        const userInfo = results[0];
        const initialCards = results[1];
        profileTitle.textContent = userInfo.name;
        profileJob.textContent = userInfo.about;
        profileAvatar.style.backgroundImage = `url('${userInfo.avatar}')`;
        myUserId = userInfo._id;

        initialCards.forEach(function (item) {
            const newcard = createCard(
              item,
              deleteFunction,
              likeFunction,
              openImagePopup
            );
            cards.append(newcard);
          });
    })
    .catch(error => {
        console.error("Ошибка:", error);
      });


buttonEdit.addEventListener("click", function () {
  name.value = profileTitle.textContent;
  description.value = profileJob.textContent;
  clearValidation(formEdit, validationConfig);
  openModal(popupEdit);
});
buttonNew.addEventListener("click", function () {
  openModal(popupNew);
});
buttonAvatar.addEventListener("click", function () {
    openModal(popupAvatar);
})

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  formEditSubmitButton.textContent = "Сохранение...";
  formEditSubmitButton.disabled = true;

  profileTitle.textContent = name.value;
  profileJob.textContent = description.value;
  editProfile(name.value, description.value)
    .then(() => {
        formEditSubmitButton.textContent = "Сохранить";
        formEditSubmitButton.disabled = true;

        closeModal(popupEdit);
    })
    .catch(error => {
        console.error("Ошибка:", error);
      });
}

formEdit.addEventListener("submit", handleEditFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  formAddSubmitButton.textContent = "Сохранение...";
  formAddSubmitButton.disabled = true;

  postNewCard(place.value, image.value)
    .then((newplace) => {
        const newcard = createCard(
            newplace,
            deleteFunction,
            likeFunction,
            openImagePopup
          );
        cards.prepend(newcard);

        formAddSubmitButton.textContent = "Сохранить";
        formAddSubmitButton.disabled = true;

        formAdd.reset();
        clearValidation(formAdd, validationConfig);

        closeModal(popupNew);
    })
    .catch(error => {
        console.error("Ошибка:", error);
      });
}

formAdd.addEventListener("submit", handleAddFormSubmit);

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    formAvatarSubmitButton.textContent = "Сохранение...";
    formAvatarSubmitButton.disabled = true;
  
    editAvatar(avatar.value)
      .then((res) => {
        profileAvatar.style.backgroundImage = `url('${res.avatar}')`;

        formAvatarSubmitButton.textContent = "Сохранить";
        formAvatarSubmitButton.disabled = true;

        formAvatar.reset();
        clearValidation(formAvatar, validationConfig);
  
        closeModal(popupAvatar);
      })
      .catch(error => {
        console.error("Ошибка:", error);
      });
}

formAvatar.addEventListener("submit", handleAvatarFormSubmit);


enableValidation(validationConfig);
