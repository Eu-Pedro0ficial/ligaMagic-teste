"use strict";
import cards from "./data.js";

let imageContainer = document.querySelector("#image-container");

const cardImage = document.querySelector("#card-image");
const cardName = document.querySelector("#card-name");
const caption = document.querySelector("#caption");
const cardColor = document.querySelector("#card-color");
const cardManaCost = document.querySelector("#mana-cost");
const cardType = document.querySelector("#card-type");
const cardArtist = document.querySelector("#card-artist");
const cardRarity = document.querySelector("#card-rarity");

const lowPrice = document.querySelector("#card-low-price");
const mediumPrice = document.querySelector("#card-medium-price");
const highPrice = document.querySelector("#card-high-price");

const heartTransparent = document.querySelector("#heart-transparent");
const heartRed = document.querySelector("#heart-red");

const optionsButton = document.querySelector("#options-button");

const addToList = document.querySelector("#add-to-list");

function getLocalStorageData(){
  return JSON.parse(localStorage.getItem("data"));
}

function setLocalStorageData(data){
  localStorage.setItem("data", JSON.stringify(data));
}

if(!getLocalStorageData()){
  setLocalStorageData(cards);
}

function loadCards(data){
  imageContainer.innerHTML = "";
  data.forEach((card)=>{
    imageContainer.innerHTML += `
      <img class="aside--container--image-container--card" src="${card.image}" alt="imagem da carta">
    `
  })
}
loadCards(cards);

const fixedChartIndex = 3

function updateImageContainer(){
  imageContainer = document.querySelector("#image-container")
}

function getCurrentCard(){
  return imageContainer.children[fixedChartIndex];
}

function getFirstChieldImageContainer(){
  return imageContainer.children[0];
}

function setGrayFilterOnUnselectedCards(){
  const cardImagesArray = Object.keys(imageContainer.children).map(key => imageContainer.children[key]);
  cardImagesArray.forEach((card)=> {
    if(!card.classList.contains("gray-card")) card.classList.add("gray-card");
  });
  getCurrentCard().classList.remove("gray-card");
}
setGrayFilterOnUnselectedCards();

function toggleFavorite(){
  const currentCardInfo = getLocalStorageData().filter((card) => card.image === getCurrentCard().getAttribute("src"));
  const newData = getLocalStorageData().filter((card) => card.image !== getCurrentCard().getAttribute("src"));

  if(!heartTransparent.classList.contains("hidden")){
    heartTransparent.classList.add("hidden");
    heartRed.classList.remove("hidden");

    currentCardInfo[0].favorite = true;
    newData.push(currentCardInfo[0]);
    setLocalStorageData(newData);
    return
  }

  if(heartTransparent.classList.contains("hidden")){
    heartTransparent.classList.remove("hidden");
    heartRed.classList.add("hidden");

    currentCardInfo[0].favorite = false;
    newData.push(currentCardInfo[0]);
    setLocalStorageData(newData);
  }
}

function setFavoriteCard(isFavorited){
  if(!isFavorited){
    heartTransparent.classList.remove("hidden");
    heartRed.classList.add("hidden");
    return
  }

  heartTransparent.classList.add("hidden");
  heartRed.classList.remove("hidden");
}

function setCurrentCardInformation(){
  let currentCardInfo = getLocalStorageData() ?
  getLocalStorageData().filter((card) => card.image === getCurrentCard().getAttribute("src")) :
  cards.filter((card) => card.image === getCurrentCard().getAttribute("src"));


  cardImage.src = currentCardInfo[0].image;
  cardName.textContent = currentCardInfo[0].title;
  caption.textContent = currentCardInfo[0].caption;
  cardColor.style.color = currentCardInfo[0].color;
  cardColor.textContent = currentCardInfo[0].colorText;

  let manaCost = "";
  for (let index = 1; index <= currentCardInfo[0].mana; index++) {
    manaCost += "<img class='main--content--detail--info--content-icon--image' src='./assets/img/gout-icon.svg' alt='icone de gota de água'>";
  }
  cardManaCost.innerHTML = manaCost;

  cardType.textContent = currentCardInfo[0].type;
  lowPrice.textContent = currentCardInfo[0].marketPrice.low;
  mediumPrice.textContent = currentCardInfo[0].marketPrice.medium;
  highPrice.textContent = currentCardInfo[0].marketPrice.high;
  cardArtist.textContent = currentCardInfo[0].artist;
  cardRarity.textContent = currentCardInfo[0].rarity;

  setFavoriteCard(currentCardInfo[0].favorite);
}
setCurrentCardInformation();

function previousImage(){
  const lastChield = imageContainer.children[imageContainer.children.length - 1];
  imageContainer.insertBefore(lastChield, getFirstChieldImageContainer());
  updateImageContainer();
}

document.querySelector("#button-left").addEventListener("click", ()=>{
  previousImage();
  setGrayFilterOnUnselectedCards();
  setCurrentCardInformation();
});

function nextImage(){
  imageContainer.appendChild(getFirstChieldImageContainer());
  updateImageContainer();
}

document.querySelector("#button-right").addEventListener("click", ()=>{
  nextImage();
  setGrayFilterOnUnselectedCards();
  setCurrentCardInformation();
});

const countValue = document.querySelector("#counter-value");
let amount = countValue.value;

function setValueInCard(value){

  if(value < 0){
    amount = 0;
    countValue.value = amount;
    return;
  }

  countValue.value = value;
}

document.querySelector("#favorite-button").addEventListener("click", toggleFavorite)

document.querySelector("#add-button").addEventListener("click", ()=>{
  setValueInCard(++amount)
});

document.querySelector("#subtract-button").addEventListener("click", ()=>{
  setValueInCard(--amount)
});

document.querySelector("#more-info-detail").addEventListener("click", ()=>{

  if(cardArtist.parentNode.classList.contains("hidden")){
    cardArtist.parentNode.classList.remove("hidden");
    cardRarity.parentNode.classList.remove("hidden");
    return
  }

  if(!cardArtist.parentNode.classList.contains("hidden")){
    cardArtist.parentNode.classList.add("hidden");
    cardRarity.parentNode.classList.add("hidden");
    return
  }
});

document.querySelector("#more-info-marketplace").addEventListener("click", ()=>{

});

const marketplaceSessionBalloon = document.querySelector("#marketplace-balloon");

document.querySelector("#marketplace-help").addEventListener("mouseenter", ()=>{
  marketplaceSessionBalloon.style.display = "block";
});
document.querySelector("#marketplace-help").addEventListener("mouseleave", ()=>{
  marketplaceSessionBalloon.style.display = "none";
});

const cartSessionBalloon = document.querySelector("#add-balloon");

document.querySelector("#add-help").addEventListener("mouseenter", ()=>{
  cartSessionBalloon.style.display = "block";
});
document.querySelector("#add-help").addEventListener("mouseleave", ()=>{
  cartSessionBalloon.style.display = "none";
});

const modal = document.querySelector("#modal");

document.querySelector("#filter").addEventListener("click", ()=>{
  modal.setAttribute("open", "");
})
document.querySelector("#button-close").addEventListener("click", ()=>{
  modal.removeAttribute("open");
})

function filterRepeatedOptions(data){
  const uniqueOptions = new Set(data);
  return [...uniqueOptions];
}

function getOptionsValue(key, data){
  const optionsValue = data.map(item => item[key]);

  return filterRepeatedOptions(optionsValue);
}

const typeSelect = document.querySelector("#type-select");

function setTypeOptions(){
  const options = getOptionsValue("type", cards);

  options.forEach((option) =>{
    typeSelect.innerHTML += `<option class="main--content--add--modal--container--select--option" value="${option}">${option}</option>`
  })
}
setTypeOptions();

typeSelect.addEventListener("change", (event)=>{
  const selectedOption = event.target.value;
  console.log(selectedOption)

  if(!selectedOption){
    loadCards(cards);
    updateImageContainer();
    setGrayFilterOnUnselectedCards()
    return;
  }
  
  const filteredData = cards.filter((card) => card.type === selectedOption);
  
  loadCards(filteredData);
  updateImageContainer();
  setGrayFilterOnUnselectedCards()
})

const colorSelect = document.querySelector("#color-select");

function setColorOptions(){
  const options = getOptionsValue("colorText", cards);

  options.forEach((option) =>{
    colorSelect.innerHTML += `<option class="main--content--add--modal--container--select--option" value="${option}">${option}</option>`
  })
}
setColorOptions();

colorSelect.addEventListener("change", (event)=>{
  const selectedOption = event.target.value;
  console.log(selectedOption)

  if(!selectedOption){
    loadCards(cards);
    updateImageContainer();
    setGrayFilterOnUnselectedCards()
    return;
  }
  
  const filteredData = cards.filter((card) => card.colorText === selectedOption);
  
  loadCards(filteredData);
  updateImageContainer();
  setGrayFilterOnUnselectedCards()
})

// @todo - Contruir o DATA correto

// @todo - função options
// @todo - resolve bugs da filtragem

// @todo - fazer o carrosel se mover ao clicar e arrastar (diferencial)