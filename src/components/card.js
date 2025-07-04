function createCard(cardData, deleteFunc, handleLike, openImagePopup, myUserId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likesElement = cardElement.querySelector(".card__likes");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  if (cardData.likes) {
    likesElement.textContent = cardData.likes.length;
    if (cardData.likes.some((like) => like._id === myUserId)) {
      updateLike(likesElement, cardData.likes, likeButton);
    }
  } else {
    likesElement.textContent = 0;
  }

  if (cardData.owner._id === myUserId) {
    deleteButton.addEventListener("click", () => deleteFunc(cardElement, cardData));
  } else {
    deleteButton.style.display = "none";
  }

  likeButton.addEventListener("click", () => handleLike(checkIfLiked(likeButton), cardData._id, likesElement, likeButton));
  cardImage.addEventListener("click", () => openImagePopup(cardData));

  return cardElement;
}

function checkIfLiked(button) {
    return button.classList.contains("card__like-button_is-active");
}

function updateLike(likesElement, likesArray, button) {
  button.classList.toggle("card__like-button_is-active");
  likesElement.textContent = likesArray.length;
}

export { createCard, updateLike };
