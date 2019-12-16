var outfits = [];
var id = 0;

createOutfit();

function createOutfit() {
  id++;
  outfits.push(new Outfit(id));
};
