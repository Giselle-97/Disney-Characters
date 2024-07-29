'use strict';

// Elementos del DOM
let cardsList = document.querySelector('.js_cardsList');
const ulFavorites = document.querySelector('.js_cardfav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.btnSearch');
const btnReset = document.querySelector('.js_btnReset');

//const urlApi = 'https://api.disneyapi.dev/character?pageSize=50';
const urlApi = 'https://dev.adalab.es/api/disney?pageSize=15';

let cardsListApi = [];
let cardsFavoriteApi = [];

// Carga favoritos del localStorage
const localStorageFav = JSON.parse(localStorage.getItem('favDisney'));

// Fetch de la API
fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    cardsListApi = data.data;
    renderCardsList(cardsListApi);
    favLStorage(); // Mueve esto aquí para asegurar que la API ha cargado los datos antes
  });

function favLStorage() {
  if (localStorageFav) {
    cardsFavoriteApi = localStorageFav;
    renderFavoriteList();
  }
}

// Renderiza la lista de tarjetas
function renderCardsList(listData) {
  cardsList.innerHTML = '';
  for (const card of listData) {
    cardsList.innerHTML += renderCard(card);
  }
  addEventCard();
}

// Añade evento click a cada tarjeta
function addEventCard() {
  const liCardList = document.querySelectorAll('.js_licards');
  for (const liCard of liCardList) {
    liCard.addEventListener('click', handleClick);
  }
}

// Genera el HTML de una tarjeta
function renderCard(card) {
  if (!card || !card._id) {
    return '';
  }

  let html = `<li id="${card._id}" class="licards js_licards">
    <img class="imgCard" src="${card.imageUrl || 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'}" alt="Disney Characters">
    <h3 class="titleName">${card.name}</h3>
    <button class="btnRemoveFav js_btnRemoveFav">Delete</button>
  </li>`;

  return html;
}

// Maneja el click en el botón de eliminar favorito
function handleRemoveFav(event) {
  const id = parseInt(event.currentTarget.parentElement.id);
  const indexCard = cardsFavoriteApi.findIndex((item) => item._id === id);
  if (indexCard !== -1) {
    cardsFavoriteApi.splice(indexCard, 1);
    localStorage.setItem('favDisney', JSON.stringify(cardsFavoriteApi));
    renderFavoriteList();
  }
}

// Añade evento click a los botones de eliminar favorito
function addEventCardFav() {
  const btnRemoveFav = document.querySelectorAll('.js_btnRemoveFav');
  for (const btnRemove of btnRemoveFav) {
    btnRemove.addEventListener('click', handleRemoveFav);
  }
}

//Favoritos
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

// Renderiza la lista de favoritos
function renderFavoriteList() {
  ulFavorites.innerHTML = '';
  for (const fav of cardsFavoriteApi) {
    ulFavorites.innerHTML += renderCard(fav);
  }
  addEventCardFav();
}

// Maneja el reset de favoritos
const handleReset = (event) => {
  event.preventDefault();
  cardsFavoriteApi = [];
  localStorage.clear();
  renderFavoriteList();
};
btnReset.addEventListener('click', handleReset);

//Búsqueda
const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  const filterList = cardsListApi.filter((card) =>
    card.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  renderCardsList(filterList);
};
btnSearch.addEventListener('click', handleSearch);
