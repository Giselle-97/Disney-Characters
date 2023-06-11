'use strict';

const cardsList = document.querySelector('.js_cardsList');
const inputSearch = document.querySelector('.search');
const btnSearch = document.querySelector('.btnSearch');

console.log(cardsList);

/*
let cardsFavorite = [];*/
let cardsListApi = [];

const urlApi = 'https://api.disneyapi.dev/character?pageSize=15';

function renderCard(cardsListApi) {
  cardsList.innerHTML += `
  <li id="${cardsListApi._id}" class= "licards js_licards">
  <img src="${cardsListApi.imageUrl}">
  <h3>"${cardsListApi.name}"</h3>
  </li>`;
}

function renderCardsList(cardsListApi) {
  for (let i = 0; i < cardsListApi.length; i++) {
    renderCard(cardsListApi[i]);
  }
  /*const liCards = document.querySelectorAll('.js_licards');
  console.log(liCards);*/
}

fetch(urlApi)
  .then((response) => response.json())
  .then((data) => {
    cardsListApi = data.data;
    console.log(cardsListApi);
    renderCardsList(cardsListApi);
  });

/*
  para hacer la lista de favoritos

  const liCards = document.querySelectorAll('.js_licards');
  console.log(liCards);
  */

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
