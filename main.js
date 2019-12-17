var outfits = [];
var id = 0;
var hatBox = document.getElementById('hat-box');
var hatsBtns = document.querySelectorAll('.hats-btn');
var tophatBtn = document.getElementById('tophat-btn');
var hatImgs = document.querySelectorAll('.hat');
var clothesBox = document.getElementById('clothes-box');
var clothesBtns = document.querySelectorAll('.clothes-btn');
var column1 = document.querySelector('.column1');
var accessoriesBox = document.getElementById('accessories-box');
var accessoriesBtns = document.querySelectorAll('.accessories-btn');
var sunhatImg = document.getElementById('sunhat-img');
var sunhatBtn = document.getElementById('sunhat-btn');
var tophatImg = document.getElementById('tophat-img');
var tophatBtn = document.getElementById('tophat-btn');
var images = document.querySelectorAll('.bear-outfits > *')

createOutfit();

function createOutfit() {
  id++;
  outfits.push(new Outfit(id));
};

hatBox.addEventListener('click', function() {
  addRemoveImages('hat');
  toggleBtnClass('hats-btn', hatsBtns);
});

accessoriesBox.addEventListener('click', function() {
  addRemoveImages('accessory');
  toggleBtnClass('accessories-btn', accessoriesBtns);
});

clothesBox.addEventListener('click', function() {
  addRemoveImages('clothing');
  toggleBtnClass('clothes-btn', clothesBtns);
});

function toggleBtnClass(buttonClass, buttonList) {
  if (event.target.classList.contains(buttonClass)) {
    event.target.classList.toggle('active');
    removeActiveBtnStates(buttonList);
  }
}

function removeActiveBtnStates(buttonList) {
  for (var i =0; i < buttonList.length; i++) {
    if (buttonList[i] !== event.target) {
      buttonList[i].classList.remove('active');
    }
  }
}

function removeAssociatedImage() {
  for (var i = 0; i < images.length; i++) {
    if (event.target.classList.contains(images[i].id)) {
      images[i].classList.remove('visible');
      outfits[outfits.length - 1].removeGarment(images[i].id);
    }
  }
}

function checkInactiveTarget(category) {
  for (var i = 0; i < images.length; i++) {
    if (images[i].classList.contains(category)) {
      images[i].classList.remove('visible');
      outfits[outfits.length - 1].removeGarment(images[i].id);
    }
  }
}

function findMatchingButton(){
  for (var i = 0; i < images.length; i++) {
    if (event.target.classList.contains(images[i].id)) {
      images[i].classList.add('visible');
      outfits[outfits.length-1].addGarment(images[i].id);
    }
  }
}

function addRemoveImages(category){
  if (event.target.classList.contains('active')) {
    removeAssociatedImage();
  } else {
    checkInactiveTarget(category);
    findMatchingButton();
  }
}

var outfitName = document.getElementById('outfit-input');
var outfitStorage = document.querySelector('.outfit-storage');

function addSavedOutfitCard() {
  var outfitNameHTML =
  `<section class="outfit-card">
    <p>${outfitName}</p>
    <i class="fa fa-times-circle"></i>
  </section>`
  outfitStorage.insertAdjacentHTML(afterbegin, outfitNameHTML);
}
