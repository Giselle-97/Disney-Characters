'use strict';

let cardsList = document.querySelector('.js_cardsList');
const ulFavorites = document.querySelector('.js_cardfav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.btnSearch');
const btnReset = document.querySelector('.js_btnReset');
const btnRemoveFav = document.querySelector('.js_btnRemoveFav');

const urlApi = 'https://api.disneyapi.dev/character?pageSize=15';

let cardsListApi = [];
let cardsFavoriteApi = [];

//localS
const localStorageFav = JSON.parse(localStorage.getItem('favDisney'));
favLStorage();
function favLStorage() {
  if (localStorageFav) {
    cardsFavoriteApi = localStorageFav;
    renderFavoriteList(cardsFavoriteApi);
  }
}

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    cardsListApi = data.data;
    console.log(cardsListApi);
    renderCardsList(cardsListApi);
  });

function renderCardsList(listData) {
  cardsList.innerHTML = '';
  for (const card of listData) {
    cardsList.innerHTML += renderCard(card);
  }
  addEventCard();
}

function addEventCard() {
  const liCardList = document.querySelectorAll('.js_licards');
  for (const liCard of liCardList) {
    liCard.addEventListener('click', handleClick);
  }
}

function renderCard(card) {
  console.log(card);
  let html = `<li id="${card._id}" class= "licards js_licards">
  <img class="imgCard" src="${card.imageUrl}">
  <h3 class="titleName">"${card.name}"</h3>
  <button class="btnRemoveFav js_btnRemoveFav">X</button>
  </li>`;
  return html;
}

//favoritos
function handleClick(event) {
  const id = parseInt(event.currentTarget.id);
  console.log(id);
  const selectedCard = cardsListApi.find((item) => item._id === id);
  const indexCard = cardsFavoriteApi.findIndex((item) => item._id === id);

  if (indexCard === -1) {
    cardsFavoriteApi.push(selectedCard);
    localStorage.setItem('favDisney', JSON.stringify(cardsFavoriteApi));
  } else {
    cardsFavoriteApi.splice(indexCard, 1);
  }
  console.log(cardsFavoriteApi);
  renderFavoriteList();
}

function renderFavoriteList() {
  ulFavorites.innerHTML = '';
  for (const fav of cardsFavoriteApi) {
    ulFavorites.innerHTML += renderCard(fav);
  }
}
//btn reset
const handleReset = (event) => {
  event.preventDefault();
  cardsFavoriteApi = [];
  localStorage.clear();
  renderFavoriteList();
};
btnReset.addEventListener('click', handleReset);

//buscador

const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  const filterList = cardsListApi.filter((card) =>
    card.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log(filterList);
  renderCardsList(filterList);
};
btnSearch.addEventListener('click', handleSearch);

//btnX

const handleRemoveFav = () => {
  const id = parseInt(event.currentTarget.id);
  console.log(id);
  //cardsFavoriteApi =
};
btnRemoveFav.addEventListener('click', handleRemoveFav);
