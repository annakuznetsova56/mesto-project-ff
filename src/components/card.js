import { deleteCard, putLike, deleteLike } from "./api.js";
import { myUserId } from "../scripts/index.js";
import { closeModal, openModal } from "./modal.js";

let currentCardElement = null;
let currentCardId = null;

function createCard(cardData, deleteFunc, likeFunc, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likes = cardElement.querySelector(".card__likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  
  const popupDelete = document.querySelector(".popup_type_delete");
  const popupDeleteButton = popupDelete.querySelector(".popup__button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  if(cardData.likes) {
    likes.textContent = cardData.likes.length;
    if(cardData.likes.some(like => like._id === myUserId)) {
        likeFunc(likeButton);
    }
  } else {
    likes.textContent = 0;
  }
  
  if(cardData.owner._id === myUserId) {
        deleteButton.addEventListener("click", () => {
            console.log("here");
            currentCardElement = cardElement;
            currentCardId = cardData._id;
            openModal(popupDelete);
        });

        popupDeleteButton.addEventListener("click", () => {
            if (!currentCardElement) return;

            deleteCard(currentCardId)
                .then(() => {
                    deleteFunc(currentCardElement);
                    closeModal(popupDelete);
                    currentCardElement = null; 
                })
                .catch(error => {
                    console.error("Ошибка:", error);
                });
        });
    } else {
    deleteButton.style.display = 'none';
    }


  
  likeButton.addEventListener("click", (evt) => {
    if(evt.target.classList.contains('card__like-button_is-active')) {
        deleteLike(cardData._id)
          .then((res) => {
            likeFunc(evt.target);
            likes.textContent = res.likes.length;
          })
          .catch(error => {
            console.error("Ошибка:", error);
          });
    } else {
        putLike(cardData._id)
            .then((res) => {
            likeFunc(evt.target);
            likes.textContent = res.likes.length;
            })
            .catch(error => {
                console.error("Ошибка:", error);
            });
    }
  });
  cardImage.addEventListener("click", function() {
    openImagePopup(cardData);
  });

  return cardElement;
}

function deleteFunction(card) {
  card.remove();
}

function likeFunction(button) {
  button.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteFunction, likeFunction };
