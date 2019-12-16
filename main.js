var outfits = [];
var id = 0;

createOutfit();

function createOutfit() {
  id++;
  outfits.push(new Outfit(id));
};

var column1 = document.querySelector('.column1');
column1.addEventListener('click', function() {
  addGarment(event, 'hats-btn');
  addGarment(event, 'clothes-btn');
  addGarment(event, 'accessories-btn');
});

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
