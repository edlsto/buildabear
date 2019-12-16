var outfits = [];
var id = 0;
var hatBox = document.getElementById('hat-box');
var clothesBox = document.getElementById('clothes-box');
var column1 = document.querySelector('.column1');
var accessoriesBox = document.getElementById('accessories-box');

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
  toggleButtonClass(event)
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

var buttonList = document.querySelectorAll('.hats-btn');

function toggleButtonClass(event) {
  if (event.target.classList.contains('hats-btn')) {
    event.target.classList.toggle('active');
    console.log(event.target);
    for (var i =0; i < buttonList.length; i++) {
      if (buttonList[i] !== event.target) {
        buttonList[i].classList.remove('active');
      }
    }
    // linkButtonToGarment()
  }
}

// linkButtonToGarment(tophatBtn, tophatImg);


function linkButtonToGarment(btn, garment){
  if (event.target.id === btn) {
    garment.classList.add('visible');
  }
}
