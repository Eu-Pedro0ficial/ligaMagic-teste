"use strict";
import cards from "./data.js";

const imageContainer = document.querySelector("#image-container");
const buttonRight = document.querySelector("#button-right");
const buttonLeft = document.querySelector("#button-left");

const cardName = document.querySelector("#card-name");
const favoriteButton = document.querySelector("#favorite-button");
const optionsButton = document.querySelector("#options-button");
const caption = document.querySelector("#caption");

const plusButton = document.querySelector("#add-button");
const subtractButton = document.querySelector("#subtract-button");
const countValue = document.querySelector("#counter-value");
const settings = document.querySelector("#settings");
const addToList = document.querySelector("#add-to-list");

const moreInfoDetail = document.querySelector("#more-info-detail");
const moreInforMarketplace = document.querySelector("#more-info-marketplace");

function loadCards(){
  imageContainer.innerHTML = "";
  cards.forEach((card)=>{
    imageContainer.innerHTML += `
    <div class="aside--container--image-container--card">
      <img class="aside--container--image-container--card--image" src="${card.image}" alt="imagem da carta">
    </div>
    `
  })
}

loadCards();

let images = document.querySelectorAll(".aside--container--image-container--card");

let currentPosition = 0;

function previousImage(){
  imageContainer.appendChild(images[0])
  images = document.querySelectorAll(".aside--container--image-container--card");
}

buttonLeft.addEventListener("click", previousImage)

function nextImage(){
  const lastItem = images[images.length - 1];

  imageContainer.insertBefore(lastItem, images[0]);
  images = document.querySelectorAll(".aside--container--image-container--card");
}

buttonRight.addEventListener("click", nextImage)
