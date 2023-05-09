import { getGroupName, getGroupMembers, getColour } from "./firebaseModel";

class PixLEDModel {
  constructor(gridArray) {
    this.observers = [];
    this.gridArray = gridArray;
    this.paletteColor = null;
    this.chosenLED = null;
    this.timer = 15;
    this.currentUser = null;
    this.groupNameError = null;
    this.groupMembers = null;
    this.members = [];
    this.colour = null;
  }

  async convertColours() {
    let i = 0;
    while(i < 4085){
      // console.log("hi")
      await this.test(i);
      console.log(i + ": " + this.colour)
      switch(this.colour){
        case "blue":
          this.updateColorInDatabase("#0040ff", i);
          // console.log(i + ": changed!");
          break;
        case 'red':
          this.updateColorInDatabase("#ff0000", i);
          // console.log("changed!");
          break;
        case 'white':
          this.updateColorInDatabase("#ffffff", i);
          break;
        case 'black':
          this.updateColorInDatabase("#000000", i);
          break;
        case 'lime':
          this.updateColorInDatabase("#90f556", i);
          break;
        case 'orange':
          this.updateColorInDatabase("#ff9100", i);
          break;
        default:
          break;
      }

      i++;
    }
  }

  async test(index) {
    this.colour = await this.getColour(index);
    // console.log(this.colour);
  }

  async getColour(index){
    return await getColour(index);
  }

  /**
   * Add a new observer to the observers list
   * @param {Function} callback A function to be called upon notifying the observers
   */
  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  /**
   * Update the timer for submitting
   * @param {int} time The new timer value
   */
  updateTimer(time) {
    this.timer = time;
    this.notifyObservers();
  }

  /**
   * Set the selected color in the color palette
   * @param {string} color The selected color
   */
  setPaletteColor(color) {
    this.paletteColor = color;
    this.notifyObservers();
  }

  /**
   * Set the app's LED grid array to the specified array
   * @param {Array} gridArray The new LED array
   */
  setGridArray(gridArray) {
    this.gridArray = gridArray;
    this.notifyObservers();
  }
  /**
   * Remove an observer from the observers list
   * @param {Function} callback The observer to remove
   */
  removeObserver(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  /***
   * Creates a new group with current user as the owner
   * @param {string} name The name of the group
   * @param {int} uuid The unique identifier of the group
   */
  setGroup(name, uuid) {
    try {
      this.notifyObservers({ groupName: name, uuid: uuid });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Update the selected LED's color in the Firebase Realtime Database
   * @param {string} color The new color of the selected LED
   * @param {int} ledNumber The index of the selected LED
   */
  updateColorInDatabase(color, ledNumber) {
    this.notifyObservers({ ledColor: color, ledNumber });
    this.selectLED(null);
  }

  /**
   * Set the current user of the app
   * @param {Object} user The current user object
   */
  setCurrentUser(user) {
    this.currentUser = user;
    this.notifyObservers();
  }

  setGroupNameError(error) {
    this.groupNameError = error;
  }

  /***
   * Makes the clicked LED "selected"
   * @param {int} index LEd's index in the matrix array
   */
  selectLED(index) {
    this.chosenLED = index;
    if (this.currentUser && this.currentUser.group)
      this.notifyObservers({
        ledIndex: index,
        name: this.currentUser.name,
        groupId: this.currentUser.group,
      });

    this.notifyObservers();
  }

  /***
   * Sets the members of the group the current user is part of
   * @param {Array} members The members of the group
   */
  setMembers(members) {
    this.members = members;
    this.notifyObservers();
  }
  /***
   * User has accepted to join a group
   * @param {int} groupId The id of the group the user wants to join
   */
  acceptInvitation(groupId) {
    this.notifyObservers({ groupIdNumber: groupId });
    this.setMembers(this.getGroupMembers(groupId));
    this.currentUser.group = groupId;
  }

  /***
   * Retreives the group name of the specified group
   * to show on the group page
   * @param {int} groupId The id of the group
   * @returns {string} The group name
   */
  async getGroupName() {
    return await getGroupName(this.currentUser.group);
  }

  /***
   * Retreives the members of the specified group
   * to display on the group page
   * @param {int} groupId The id of the group
   * @returns {Array} The group members
   */
  async getGroupMembers(groupId) {
    return await getGroupMembers(groupId);
  }

  notifyObservers(payload) {
    try {
      this.observers.forEach((obs) => obs(payload));
    } catch (err) {}
  }
}

export default PixLEDModel;
