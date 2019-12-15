var outfits = [];
var id = 0;

function createOutfit(title, garments, background) {
  id++;
  outfits.push(new Outfit(id, title, garments, background));
}

// createOutfit("Space prom", [], "blank");
// createOutfit("Day at beach", ["Sun hat"], "Beach");
// createOutfit("At the park", ["Smart watch"], "Park");
//
// outfits[1].addGarment("Top hat");
// outfits[2].addGarment("Necklace");
// outfits[0].addGarment("Space helmet");
// outfits[0].addGarment("Vest");
// outfits[0].removeGarment("Vest");
// outfits[0].addGarment("Dress");
