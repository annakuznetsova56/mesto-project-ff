function addCard(cardData, deleteFunc, likeFunc, imagePopupOpen) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteFunc);
  cardElement.querySelector(".card__like-button").addEventListener("click", likeFunc);
  cardElement.querySelector(".card__image").addEventListener("click", imagePopupOpen);

  return cardElement;
}

function deleteFunction(button) {
  button.target.closest(".card").remove();
}

function likeFunction(button) {
  if (button.target.classList.contains("card__like-button_is-active")) {
    button.target.classList.remove("card__like-button_is-active");
  } else {
    button.target.classList.add("card__like-button_is-active");
  }
}

export { addCard, deleteFunction, likeFunction };
