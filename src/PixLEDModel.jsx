import {
  getGroupName,
  getGroupMembers,
  getPosts,
  leaveTeam,
} from "./firebaseModel";
import gameOverScreen from "./assets/gameOverScreen";

class PixLEDModel {
  constructor(gridArray) {
    this.observers = [];
    this.snake = [10]; // snake[9] is the head
    this.movementDir = 1; // 1-2-3-4, right-down-left-up
    this.gameIsOn = false;
    this.arrayCopy = []; // Copy of the grid array to restore the grid after the game
    this.gridArray = gridArray;
    this.paletteColor = null;
    this.chosenLED = null;
    this.timer = 30;
    this.currentUser = null;
    this.groupNameError = null;
    this.groupMembers = null;
    this.members = [];
    this.openMGroup = false;
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
   * Opens/closes group list in the mobile version
   */
  openMobileGroup() {
    this.openMGroup = this.openMGroup ? false : true;
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
      const user = {
        id: this.currentUser.id,
        name: this.currentUser.name,
        group: uuid,
      };
      this.setCurrentUser(user);
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
  async acceptInvitation(groupId) {
    this.notifyObservers({ groupIdNumber: groupId });
    const members = this.getGroupMembers(groupId);
    this.setMembers(members);
    this.currentUser.group = groupId;
  }

  /***
   * Retreives the group name of the specified group
   * to show on the group page
   * @param {int} groupId The id of the group
   * @returns {string} The group name
   */
  async getGroupName() {
    if (this.currentUser && this.currentUser.group)
      return await getGroupName(this.currentUser.group);
  }

  async getGroupNameToShowOnInvitationPage(id) {
    return await getGroupName(id);
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

  async uploadImage(photoURL) {
    this.notifyObservers({ photoURL: photoURL });
  }

  async getPosts() {
    return await getPosts();
  }

  async leaveTeam() {
    await leaveTeam(this.currentUser.group, this.currentUser.name);
    this.setMembers([]);
    const user = {
      id: this.currentUser.id,
      name: this.currentUser.name,
      group: null,
    };
    this.setCurrentUser(user);
    this.notifyObservers();
  }

  notifyObservers(payload) {
    try {
      this.observers.forEach((obs) => obs(payload));
    } catch (err) {}
  }

  copyGridState() {
    this.updateColorInDatabase("#000000", 0);
    this.updateColorInDatabase("#FFFFFF", 63);
    for(let i = 0; i < this.gridArray.length; i++){
      this.arrayCopy[i] = this.gridArray[i];
    }
    // this.gridArray[0] = "#000000";
    // console.log(this.gridArray);
    // console.log(this.arrayCopy);
  }
  restoreGridState() {
    // console.log(this.arrayCopy);
    // console.log(this.arrayCopy.length);
    for(let i = 0; i < this.arrayCopy.length; i++){
      this.gridArray[i] = this.arrayCopy[i];
    }
  }

  checkCorners() {
    console.log(this.gridArray[0]);
    console.log(this.gridArray[63]);
    console.log(this.gridArray[4032]);
    console.log(this.gridArray[4095]);

    return this.gridArray[0] === this.gridArray[63] &&
           this.gridArray[4095] === this.gridArray[4032] &&
           this.gridArray[0] === this.gridArray[4095];
  }

  async startGame() {
    if(!this.checkCorners()) return;
    this.copyGridState();
    await new Promise(resolve => setTimeout(resolve, 800));
    for(let i = 0; i < 10; i++){
      this.gridArray[i] = "#6100B3";
      this.snake[i] = i;
    } 
    this.gameIsOn = true;
    this.selectLED(Math.floor(Math.random() * 100) + 4170);
    console.log("ORIG: " + this.gridArray);
    console.log("COPY: " + this.arrayCopy);
  }
  async snakeUpdate(){
    let temp = this.snake[9];
    let temp1 = 0;
    switch(this.movementDir){
      case 4:
        this.snake[9] -= 64;
        if(this.snake[9] < 0) {
          this.gameIsOn = false;
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.gameOver();
          return;
        }
        break;
      case 2:
        this.snake[9] += 64;
        if(this.snake[9] > 4095) {
          this.gameIsOn = false;
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.gameOver();
          return;
        }
        break;
      case 1:
        this.snake[9]++;
        if(this.snake[9] % 64 === 63) {
          this.gameIsOn = false;
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.gameOver();
          return;
        }
        break;
      case 3:
        this.snake[9]--;
        if(this.snake[9] % 64 === 0) {
          this.gameIsOn = false;
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.gameOver();
          return;
        }
        break;
      default:
        break;
    }


    for(let i = 8; i >= 0; i--){
      temp1 = this.snake[i];
      this.snake[i] = temp;
      temp = temp1;
    }
    for(let i = 0; i < 9; i++){
      if(this.snake[9] === this.snake[i]){
        this.gameIsOn = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.gameOver();
        return;
      }
    } 

    for(let i = 0; i < 10; i++){
      this.gridArray[this.snake[i]] = "#6100B3"; 
    }
    this.gridArray[temp] = "#FFFFFF";
    this.selectLED(Math.floor(Math.random() * 100) + 4170);
  }
  async gameOver(){
    console.log("GAME OVER");

    for(let i = 0; i < 64; i++){
      for(let j = 0; j < 16; j += 2){
        for(let k = 0; k < 4; k++){
          this.gridArray[i + 64 * k + 64 * 4 * j] = "#000000";
        }
      }
      for(let j = 1; j < 16; j += 2){
        for(let k = 0; k < 4; k++){
          this.gridArray[(63 - i) + 64 * k + 64 * 4 * j] = "#000000";
        }
      }
      this.selectLED(Math.floor(Math.random() * 100) + 4170);
      await new Promise(resolve => setTimeout(resolve, 4));
    }
    // alert("GAME OVER GAME OVER GAME OVER");
    for(let i = 0; i < gameOverScreen.length; i++){
      this.gridArray[gameOverScreen[i]] = "#FF0000";
      this.selectLED(Math.floor(Math.random() * 100) + 4170);
      await new Promise(resolve => setTimeout(resolve, 4));
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
    this.restoreGridState();
    this.selectLED(Math.floor(Math.random() * 100) + 4170);
    console.log("The grid is restored");

  }
}

export default PixLEDModel;
