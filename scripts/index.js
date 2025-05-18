const cardTemplate = document.querySelector('#card-template').content;

function addCard (cardData, deleteFunc) {  
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);

    return cardElement;
}

function deleteFunction (button) {
    button.target.closest('.card').remove();
}

const cards = document.querySelector('.places__list');
initialCards.forEach(function (item) {
    const newcard = addCard(item, deleteFunction);
    cards.append(newcard);
})
