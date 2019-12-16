var outfits = [];
var id = 0;

function createOutfit(title, garments, background) {
  id++;
  outfits.push(new Outfit(id, title, garments, background));
};
