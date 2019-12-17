var outfits = [];
var id = 0;
var hatBox = document.getElementById('hat-box');
var hatsBtns = document.querySelectorAll('.hats-btn');
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

createOutfit();

function createOutfit() {
  id++;
  outfits.push(new Outfit(id));
};


column1.addEventListener('click', function() {
  addGarment(event, 'hats-btn');
  addGarment(event, 'clothes-btn');
  addGarment(event, 'accessories-btn');
});

hatBox.addEventListener('click', function() {
  toggleBtnClass(event, 'hats-btn', hatsBtns);
  linkBtnToGarment(tophatBtn, tophatImg, hatImgs);
  linkBtnToGarment(sunhatBtn, sunhatImg, hatImgs);
});

accessoriesBox.addEventListener('click', function() {
  toggleBtnClass(event, 'accessories-btn', accessoriesBtns);
});

clothesBox.addEventListener('click', function() {
  toggleBtnClass(event, 'clothes-btn', clothesBtns);
});

//We may want to use IDs instead of innerText for this when we refactor
function addGarment(event, button) {
  var buttonClicked = event.target.innerText;
  var garmentsArray = outfits[outfits.length - 1].garments;
  if (event.target.classList.contains(button)) {
    if (garmentsArray.indexOf(buttonClicked) === -1){
      garmentsArray.push(buttonClicked);
    } else {
      garmentsArray.splice(garmentsArray.indexOf(buttonClicked), 1);
    };
  };
};



// function toggleButtonClass(event) {
//   if (event.target.classList.contains('hats-btn')) {
//     event.target.classList.toggle('active');
//     console.log(event.target);
//     // linkButtonToGarment()
//     removeActiveBtnStates(hatsBtns);
//   }
// }

// var hatBtns = [crownButton, tophatBtn, helmetBtn]
// var hatImgs = [crown, th, helm];

function toggleBtnClass(event, buttonClass, buttonList) {
  if (event.target.classList.contains(buttonClass)) {
    event.target.classList.toggle('active');
    // linkButtonToGarment()
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


function linkBtnToGarment(btn, garment, imgList){
  // for (var i =0; i < imgList.length; i++) {
  //   imgList[i].classList.remove('visible');
  // }

  if (event.target === btn) {
    garment.classList.toggle('visible');
  }
}
