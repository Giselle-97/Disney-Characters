'use strict';

let cardsList = document.querySelector('.js_cardsList');
const ulFavorites = document.querySelector('.js_cardfav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.btnSearch');
const btnReset = document.querySelector('.js_btnReset');

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
  let html = `<li id="${card._id}" class= "licards js_licards">
  <img class="imgCard" src="${card.imageUrl}" alt="Disney Characters">
  <h3 class="titleName">"${card.name}"</h3>
  <button class="btnRemoveFav js_btnRemoveFav"><i class="fa-regular fa-trash-can" style="color: #000205;"></i></button>
  </li>`;

  if (card.imageUrl === undefined) {
    const imgUrl2 =
      'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    html = `<li id="${card._id}" class= "licards js_licards">
  <img class="imgCard" src="${imgUrl2} alt="Disney Characters">
  <h3 class="titleName">"${card.name}"</h3>
  </li>`;
  }
  return html;
}

//btn Remove
function handleRemoveFav(event) {
  const id = parseInt(event.currentTarget.id);
  const indexCard = cardsFavoriteApi.findIndex((item) => item._id === id);
  cardsFavoriteApi.splice(indexCard, 1);
  renderFavoriteList();
}

function addEventCardFav() {
  const btnRemoveFav = document.querySelectorAll('.js_btnRemoveFav');
  for (const btnRemove of btnRemoveFav) {
    btnRemove.addEventListener('click', handleRemoveFav);
  }
}

//favorites
function handleClick(event) {
  const id = parseInt(event.currentTarget.id);
  const selectedCard = cardsListApi.find((item) => item._id === id);
  const indexCard = cardsFavoriteApi.findIndex((item) => item._id === id);

  if (indexCard === -1) {
    cardsFavoriteApi.push(selectedCard);
    localStorage.setItem('favDisney', JSON.stringify(cardsFavoriteApi));
  } else {
    cardsFavoriteApi.splice(indexCard, 1);
  }
  renderFavoriteList();
}

function renderFavoriteList() {
  ulFavorites.innerHTML = '';
  for (const fav of cardsFavoriteApi) {
    ulFavorites.innerHTML += renderCard(fav);
  }
  addEventCardFav();
}
//btn reset
const handleReset = (event) => {
  event.preventDefault();
  cardsFavoriteApi = [];
  localStorage.clear();
  renderFavoriteList();
};
btnReset.addEventListener('click', handleReset);

//search
const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  const filterList = cardsListApi.filter((card) =>
    card.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  renderCardsList(filterList);
};
btnSearch.addEventListener('click', handleSearch);
