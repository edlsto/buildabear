class Outfit {
  constructor(id) {
    this.id = id;
    this.title = "";
    this.garments = [];
    this.background = "";
  }

  addGarment(garment) {
    this.garments.push(garment)
  }

  removeGarment(garment) {
    if (this.garments.includes(garment)) {
      this.garments.splice(this.garments.indexOf(garment), 1)
    }
  }

  changeBackground(background) {
    this.background = background;
  }
}

module.exports = Outfit;
