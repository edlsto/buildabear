class Outfit {
  constructor(id) {
    this.id = id;
    this.title = "";
    this.garments = [];
    this.background = "";
  }

  addGarment(garment) {
    this.garments.push(garment);
  }

  changeBackground(background) {
    this.background = background;
  }

  removeGarment(garment) {
    if (this.garments.includes(garment)) {
      this.garments.splice(this.garments.indexOf(garment), 1);
    }
  }
}
