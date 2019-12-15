class Outfit {
  constructor(id, title, garments, background) {
    this.id = id;
    this.title = title;
    this.garments = garments;
    this.background = background;
  }

  addGarment(garment) {
    this.garments.push(garment)
  }

  removeGarment(garment) {
    this.garments.splice(this.garments.indexOf(garment), 1)
  }

  changeBackground(background) {
    this.background = background;
  }
}
