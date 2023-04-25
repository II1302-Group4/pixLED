class PixLEDModel {
  constructor(gridArray) {
    this.observers = [];
    this.gridArray = gridArray;
    this.paletteColor = null;
    this.chosenLED = null;
    this.timer = 15;
  }

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  updateTimer(time) {
    this.timer = time;
    this.notifyObservers();
  }

  setPaletteColor(color) {
    this.paletteColor = color;
    this.notifyObservers();
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
    this.setPaletteColor(null);
    this.selectLED(null);
  }

  /***
   * Makes the clicked LED "selected"
   * @param {int} index LEd's index in the matrix array
   */
  selectLED(index) {
    this.chosenLED = index;
    this.notifyObservers();
  }

  notifyObservers(payload) {
    try {
      this.observers.forEach((obs) => obs(payload));
    } catch (err) {}
  }
}

export default PixLEDModel;
