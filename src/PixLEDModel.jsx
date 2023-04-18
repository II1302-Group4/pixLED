class PixLEDModel {
  constructor(gridArray) {
    this.observers = [];
    this.gridArray = gridArray;
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
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
