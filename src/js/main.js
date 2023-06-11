'use strict';

const cardsList = document.querySelector('.js_cardsList');
console.log(cardsList);

/*
let cardsFavorite = [];*/
let cardsListApi = [];

const urlApi = 'https://api.disneyapi.dev/character?pageSize=15';

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    cardsListApi = data.data;
    renderCardsList(cardsListApi);
  });

function renderCardsList(listData) {
  for (const card of listData) {
    cardsList.innerHTML += renderCard(card);
  }
}

function renderCard(card) {
  let liCard = `<li id= "${card.id}" class= "licards js_licards"><h3> ${card.name}</h3><div class= "card">`;

  for (const image of card.imageUrl) {
    liCard += `<div class="cards_element" style="background:${image}"></div>`;
  }
  liCard += `</div></li>`;
  return liCard;
}
