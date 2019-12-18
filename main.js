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
var images = document.querySelectorAll('.bear-outfits > *');
var saveBtn = document.getElementById('save-btn');
var outfitInput = document.getElementById('outfit-input');
var outfitStorage = document.querySelector('.outfit-storage');
var bearBackground = document.querySelector('.bear-background');
var backgroundBtnBox = document.querySelector('.background-btns');
var backgroundBtns = document.querySelectorAll('.background-btn')

backgroundBtnBox.addEventListener('click', function() {
  changeBackground();
  toggleBtnClass('background-btn', backgroundBtns);
});

function changeBackground() {
  if (event.target.id === "beach") {
    bearBackground.style.backgroundImage = "url('assets/beach.png')";
  } else if (event.target.id === "hearts") {
    bearBackground.style.backgroundImage = "url('assets/hearts.png')";
  } else if (event.target.id === "outerspace") {
    bearBackground.style.backgroundImage = "url('assets/outerspace.png')";
  } else if (event.target.id === "park") {
    bearBackground.style.backgroundImage = "url('assets/park.png')";
  }
}

outfitInput.addEventListener('keyup', checkInput);


function clearForm() {
  outfitInput.value = '';
  saveBtn.setAttribute('disabled', 'disabled');
}

function checkInput() {
  if (outfitInput.value !== '') {
    saveBtn.removeAttribute('disabled')
  } else {
    saveBtn.setAttribute('disabled', 'disabled')
  }
}

createOutfit();

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

outfitStorage.addEventListener('click', function() {
  removeOutfitCard(event);
  accessOutfits(event);
});

saveBtn.addEventListener('click', function() {
  addSavedOutfitCard();
  clearForm();
  revertToNaked();
});

function createOutfit() {
  id++;
  outfits.push(new Outfit(id));
};

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

function removeOutfitCard(event) {
  if (event.target.classList.contains('fa')) {
    event.target.parentNode.remove();
  }
}

function addSavedOutfitCard() {
  var outfitName = outfitInput.value;
  var outfitNameHTML =
  `<section class="outfit-card">
    <p>${outfitName}</p>
    <i class="fa fa-times-circle"></i>
  </section>`
  outfitStorage.insertAdjacentHTML('afterbegin', outfitNameHTML);
  outfits[outfits.length - 1].title = outfitName;
  localStorage.setItem(outfitName, JSON.stringify(outfits[outfits.length - 1]));
}

var outfitCardNames = document.querySelectorAll('.outfit-card p');

function accessOutfits(event){
  var outfitToGrab = event.target.innerText;
  var stringOfOutfitObj = localStorage.getItem(outfitToGrab);
  var outfitObj = JSON.parse(stringOfOutfitObj);
  for (var i = 0; i < images.length; i++) {
    if (outfitObj.garments.indexOf(images[i].id) > -1) {
      images[i].classList.add('visible');
    } else {
      images[i].classList.remove('visible');
    }
  }
}

function revertToNaked() {
  var visibleGarments = document.querySelectorAll('.visible');
  for (var i = 0; i < visibleGarments.length; i++) {
    visibleGarments[i].classList.remove('visible');
  }
  createOutfit();
}
