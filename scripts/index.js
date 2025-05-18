function addCard (name, link, deleteFunc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc);

    return cardElement;
}

function deleteFunction (button) {
    button.target.closest('.card').remove();
}

const cards = document.querySelector('.places__list');
initialCards.forEach(function (item) {
    const newcard = addCard(item.name, item.link, deleteFunction);
    cards.append(newcard);
})