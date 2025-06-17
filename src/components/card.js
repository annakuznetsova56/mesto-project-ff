function addCard(cardData, deleteFunc, likeFunc, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteFunc);
  cardElement.querySelector(".card__like-button").addEventListener("click", likeFunc);
  cardImage.addEventListener("click", function() {
    openImagePopup(cardData);
  });

  return cardElement;
}

function deleteFunction(button) {
  button.target.closest(".card").remove();
}

function likeFunction(button) {
  button.target.classList.toggle("card__like-button_is-active");
}

export { addCard, deleteFunction, likeFunction };
