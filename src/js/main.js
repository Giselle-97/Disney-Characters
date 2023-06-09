'use strict';

const cardsList = document.querySelector('js_cardsList');

let cardsListApi = [];
let cardsFavorite = [];
let listData;
const url = 'https://api.disneyapi.dev/character?pageSize=50';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    cardsListApi = data.data;
    renderCardsList(listData);
  });

function renderCardsList(listData) {
  for (const card of listData) {
    cardList.innerHTML += renderCard(card);
  }
  //addEventPalette();
}

function renderCard(card) {
  let htmlMain = `<li id ="${card.id}" class= "js_list_card">
  <h3> ${card.fimls.name}</h3>`;

  for (const card of card.data) {
    htmlMain += htmlMain;
  }
  return htmlMain;
  console.log(renderCard);
}
