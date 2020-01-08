var accessoriesBox = document.getElementById('accessories-box');
var accessoriesBtns = document.querySelectorAll('.accessories-btn');
var backgroundBtnBox = document.querySelector('.background-btns');
var backgroundBtns = document.querySelectorAll('.background-btn');
var bearBackground = document.querySelector('.bear-background');
var clothesBox = document.getElementById('clothes-box');
var clothesBtns = document.querySelectorAll('.clothes-btn');
var column1 = document.querySelector('.column1');
var currentOutfit;
var hatBox = document.getElementById('hat-box');
var hatsBtns = document.querySelectorAll('.hats-btn');
var images = document.querySelectorAll('.bear-outfits > *');
var outfitInput = document.getElementById('outfit-input');
var outfits = [];
var outfitStorage = document.querySelector('.outfit-storage');
var saveBtn = document.getElementById('save-btn');
var allGarmentButtons = document.querySelectorAll('.hats-btn, .clothes-btn, .accessories-btn');
var warningDiv = document.querySelector('.warning-div');
var outfitSearchInput = document.getElementById('search-input');

outfitSearchInput.addEventListener('keyup', searchOutfits)

accessoriesBox.addEventListener('click', function() {
  addRemoveImages('accessory', event);
  toggleBtnClass('accessories-btn', accessoriesBtns, event);
});

backgroundBtnBox.addEventListener('click', function() {
  changeBackground(event.target.id, event);
  toggleBtnClass('background-btn', backgroundBtns, event);
  removeActiveBtnStates(backgroundBtns, event);
});

clothesBox.addEventListener('click', function() {
  addRemoveImages('clothing', event);
  toggleBtnClass('clothes-btn', clothesBtns, event);
});

column1.addEventListener('click', function() {
  bounceBtn(event);
});

hatBox.addEventListener('click', function() {
  addRemoveImages('hat', event);
  toggleBtnClass('hats-btn', hatsBtns, event);
});

saveBtn.addEventListener('click', function() {
  pushCurrentOutfitToArray();
  clearForm();
  revertToNaked(event);
});

outfitInput.addEventListener('input', function() {
  checkInput();
  validateDuplicateName();
});

outfitStorage.addEventListener('click', function() {
  removeOutfitCard(event);
  accessOutfits(event);
});

checkForSavedCards();

function validateDuplicateName() {
  var duplicate = false;
  outfits.forEach(function(outfit) {
    if (outfitInput.value === outfit.title) {
        duplicate = true;
    }
  })
  if (duplicate){
  warningDiv.innerHTML = `<p class="warning-msg"><i class="fa fa-exclamation-triangle"></i> Outfit name
    exists. On save, existing outfit will be replaced.</p>`
  } else {
    warningDiv.innerHTML = '';
  }
}

function accessOutfits(event){
  var outfitToGrab = event.target.innerText;
  var stringOfOutfits = localStorage.getItem('outfits');
  var outfitsList = JSON.parse(stringOfOutfits);
  for (var i = 0; i < outfitsList.length; i++) {
    if (outfitsList[i].title === outfitToGrab) {
      checkForGarments(outfitsList[i]);
      changeBackground(outfitsList[i].background, event);
      currentOutfit.garments = outfitsList[i].garments;
      currentOutfit.background = outfitsList[i].background;
      saveBtn.removeAttribute('disabled');
    }
  }
}

function addRemoveImages(category, event){
  if (event.target.classList.contains('active')) {
   removeAssociatedImage(event);
  } else {
    findMatchingButton(event);
  }
}

function addSavedOutfitCard(id, title) {
  var outfitName = title;
  var outfitNameHTML =
  `<section id="${id}" class="outfit-card">
    <p>${outfitName}</p>
    <i class="fa fa-times-circle"></i>
  </section>`
  outfitStorage.insertAdjacentHTML('afterbegin', outfitNameHTML);
  localStorage.setItem('outfits', JSON.stringify(outfits));
}

function bounceBtn(event) {
  if (event.target.tagName === 'BUTTON') {
    event.target.classList.remove('bounce');
    event.target.offsetWidth = event.target.offsetWidth;
    event.target.classList.add('bounce');
  }
}

function changeBackground(selector, event) {
  if (event.target.classList.contains('active')){
    bearBackground.style.backgroundImage = '';
    currentOutfit.background = '';
  } else {
    bearBackground.style.backgroundImage = `url("assets/${selector}.png")`;
    currentOutfit.background = selector;
  }
}

function checkButtons(i) {
  allGarmentButtons.forEach(function(button) {
    if (button.classList.contains(images[i].id)) {
      button.classList.add('active');
    }
  });
}

function checkImages(outfit) {
  for (var i = 0; i < images.length; i++) {
    if (outfit.garments.indexOf(images[i].id) > -1) {
      images[i].classList.add('visible');
      checkButtons(i);
    } else {
      images[i].classList.remove('visible');
    }
  }
}

function checkForGarments(outfit) {
  allGarmentButtons.forEach(function(button) {
    button.classList.remove('active');
  });
  backgroundBtns.forEach(function(button) {
    button.classList.remove('active');
  });

  checkImages(outfit);
  if (outfit.background) {
    document.getElementById(outfit.background).classList.add('active');
  }
  outfitInput.value = outfit.title;
}

function checkForSavedCards() {
  var allCards = document.querySelectorAll('.outfit-card');
  allCards.forEach(function(card) {
    card.remove();
  });
  if (localStorage.outfits === '[]' || localStorage.outfits === undefined) {
    createOutfit();
  } else {
    getOutfitsFromStorage();
    id = outfits[outfits.length - 1].id;
    createOutfit();
  }
}

function checkInactiveTarget(category) {
  for (var i = 0; i < images.length; i++) {
    if (images[i].classList.contains(category)) {
      images[i].classList.remove('visible');
      currentOutfit.removeGarment(images[i].id);
    }
  }
}

function checkInput() {
  if (outfitInput.value) {
    saveBtn.removeAttribute('disabled')
  } else {
    saveBtn.setAttribute('disabled', 'disabled')
  }
}

function clearForm() {
  outfitInput.value = '';
  saveBtn.setAttribute('disabled', 'disabled');
}

function createNewNameCard() {
  var outfitName = outfitInput.value;
  currentOutfit.title = outfitName;
  addSavedOutfitCard(currentOutfit.id, outfitName);
}

function createOutfit() {
  var id = new Date().valueOf();
  currentOutfit = new Outfit(id);
};

function findMatchingButton(event){
  for (var i = 0; i < images.length; i++) {
    if (event.target.classList.contains(images[i].id)) {
      images[i].classList.add('visible');
      currentOutfit.addGarment(images[i].id);
    }
  }
}

function getOutfitsFromStorage() {
  var retrievedOutfits = localStorage.getItem('outfits');
  var parsedOutfits = JSON.parse(retrievedOutfits);
  for (var i = 0; i < parsedOutfits.length; i++) {
    addSavedOutfitCard(parsedOutfits[i].id, parsedOutfits[i].title);
  }
  outfits = parsedOutfits;
  localStorage.setItem('outfits', JSON.stringify(outfits));
}

function pushCurrentOutfitToArray() {
  var matched = false;
  outfits.forEach(function(outfit){
    if (outfitInput.value === outfit.title) {
      outfit.garments = currentOutfit.garments;
      outfit.background = currentOutfit.background;
      matched = true;
      localStorage.setItem('outfits', JSON.stringify(outfits));
    }
  })
  if ((currentOutfit.garments !== [] || !currentOutfit.background) && !matched) {
    outfits.push(currentOutfit);
    createNewNameCard();
  }
}

function removeActiveBtnStates(buttonList, event) {
  for (var i =0; i < buttonList.length; i++) {
    if (buttonList[i] !== event.target) {
      buttonList[i].classList.remove('active');
    }
  }
}

function removeAssociatedImage(event) {
  for (var i = 0; i < images.length; i++) {
    if (event.target.classList.contains(images[i].id)) {
      images[i].classList.remove('visible');
      currentOutfit.removeGarment(images[i].id);
    }
  }
}

function removeOutfitCard(event) {
  if (event.target.classList.contains('fa')) {
    event.target.parentNode.remove();
    removeOutfitFromArray(event);
    localStorage.setItem('outfits', JSON.stringify(outfits));
    revertToNaked(event);
  }
}

function removeOutfitFromArray(event){
  var idOfClicked = parseInt(event.target.parentNode.id);
  for (var i = 0; i < outfits.length; i++) {
    if (idOfClicked === outfits[i].id) {
      outfits.splice(i, 1)
    }
  }
}

function revertToNaked(event) {
  var visibleGarments = document.querySelectorAll('.visible');
  for (var i = 0; i < visibleGarments.length; i++) {
    visibleGarments[i].classList.remove('visible');
  }
  bearBackground.style.backgroundImage = '';
  removeActiveBtnStates(hatsBtns, event);
  removeActiveBtnStates(clothesBtns, event);
  removeActiveBtnStates(accessoriesBtns, event);
  removeActiveBtnStates(backgroundBtns, event);
  createOutfit();
}

function searchOutfits() {
  var allCards = document.querySelectorAll('.outfit-card');
  allCards.forEach(function(card) {
    card.remove();
  });
  var filteredOutfits = [];
  outfits.forEach(function(outfit) {
    outfit.garments.forEach(function(garment) {
      sliceSearch(garment, outfit, filteredOutfits);
    });
    sliceSearch(outfit.title, outfit, filteredOutfits);
    sliceSearch(outfit.background, outfit, filteredOutfits);
  });
  showSearchedCards(filteredOutfits);
}

function showSearchedCards(found) {
  found.forEach(function(outfit){
    addSavedOutfitCard(outfit.id, outfit.title);
  })
}

function sliceSearch(searchArea, outfit, filteredOutfits) {
  var searchTerm = outfitSearchInput.value;
  if (searchTerm === searchArea.slice(0, searchTerm.length) && filteredOutfits.indexOf(outfit) === -1) {
    filteredOutfits.push(outfit);
  }
}

function toggleBtnClass(buttonClass, buttonList, event) {
  if (event.target.classList.contains(buttonClass)) {
    event.target.classList.toggle('active');
  }
}
