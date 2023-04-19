class PixLEDModel {
  constructor(gridArray) {
    this.observers = [];
    this.gridArray = gridArray;
    this.paletteColor = null;
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  setPaletteColor(color) {
    this.paletteColor = color;
  }

  setGridArray(gridArray) {
    this.gridArray = gridArray;
    this.notifyObservers();
  }

  removeObserver(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  updateColorInDatabase(color, ledNumber) {
    this.notifyObservers({ ledColor: color, ledNumber });
  }

  notifyObservers(payload) {
    try {
      this.observers.forEach((obs) => obs(payload));
    } catch (err) {}
  }
}

export default PixLEDModel;
