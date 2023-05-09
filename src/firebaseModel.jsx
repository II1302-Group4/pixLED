import * as firebase from "firebase/app";
import {
  getDatabase,
  get,
  child,
  ref,
  set,
  onValue,
  push,
  update,
} from "firebase/database";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./firebaseConfig";

import PixLEDModel from "./PixLEDModel";
import * as firebaseStorage from "firebase/storage";

firebase.initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth();
const storage = firebaseStorage.getStorage();

function updateFirebaseFromModel(model) {
  function getRandomColor() {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + ("000000" + randomHex).slice(-6);
  }

  model.addObserver(async function (payload) {
    if (payload) {
      if (payload.hasOwnProperty("ledColor")) {
        set(ref(db, "ledMatrix/" + payload.ledNumber), payload.ledColor);
      }
      if (payload.hasOwnProperty("groupName")) {
        const groupInDatabase = await get(
          ref(db, "groups/" + auth.currentUser.uid)
        );

        if (groupInDatabase.exists()) {
          model.setGroupNameError("You have already created a group");
        } else {
          set(ref(db, "groups/" + auth.currentUser.uid), {
            groupId: payload.uuid,
            groupName: payload.groupName,
            members: [
              {
                name: auth.currentUser.displayName,
                color: getRandomColor(),
                previewLEDIndex: null,
              },
            ],
          });

          update(ref(db, "users/" + auth.currentUser.uid), {
            group: payload.uuid,
          });
        }
      }
      if (payload.hasOwnProperty("groupIdNumber")) {
        const groups = await get(ref(db, "groups/"));

        const group = Object.entries(groups.val()).find(
          (group) => group[1].groupId === payload.groupIdNumber
        );

        const dbRef = ref(db);
        const membersArrayRef = child(dbRef, `groups/${group[0]}/members`);
        push(membersArrayRef, {
          name: auth.currentUser.displayName,
          color: getRandomColor(),
          previewLEDIndex: null,
        });
        update(ref(db, "users/" + auth.currentUser.uid), {
          group: payload.groupIdNumber,
        });
      }

      if (payload.hasOwnProperty("ledIndex")) {
        const groups = await get(ref(db, "groups/"));

        const group = Object.entries(groups.val()).find(
          (group) => group[1].groupId === payload.groupId
        );

        const membersArray = await get(ref(db, `groups/${group[0]}/members`));

        const member = Object.entries(membersArray.val()).find(
          (member) => member[1].name === payload.name
        );

        update(ref(db, `groups/${group[0]}/members/${member[0]}`), {
          previewLEDIndex: payload.ledIndex,
        });
      }

      if (payload.hasOwnProperty("photoURL")) {
        const fileRef = firebaseStorage.ref(
          storage,
          "screenshot" + Date.now() + ".png"
        );
        const response = await fetch(payload.photoURL);
        const blob = await response.blob();
        await firebaseStorage.uploadBytesResumable(fileRef, blob);
        const photoURL = await firebaseStorage.getDownloadURL(fileRef);

        const groupName = await getGroupName(model.currentUser.group);

        set(ref(db, "historyOfChanges/" + Date.now() + auth.currentUser.uid), {
          photoURL: photoURL,
          groupName: groupName,
          date: new Date().toISOString(),
        });
      }
    }
  });
}

function updateModelFromFirebase(model) {
  const ledMatrixRef = ref(db, "ledMatrix");
  onValue(ledMatrixRef, (firebaseData) => {
    model.setGridArray(Object.values(firebaseData.val()));
  });

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userInDatabase = await get(ref(db, "users/" + user.uid));
      if (!userInDatabase.exists()) {
        set(ref(db, "users/" + user.uid), {
          name: user.displayName,
          id: user.uid,
          group: null,
        });
        model.setCurrentUser({
          name: user.displayName,
          id: user.uid,
        });
      } else {
        model.setCurrentUser({
          name: user.displayName,
          id: user.uid,
          group: userInDatabase.val().group,
        });
        const groups = await get(ref(db, "groups/"));
        const group = Object.entries(groups.val()).find(
          (group) => group[1].groupId === userInDatabase.val().group
        );
        const groupRef = ref(db, "groups/" + group[0]);
        onValue(groupRef, (firebaseData) => {
          model.setMembers(Object.values(firebaseData.val().members));
        });
      }
    }
  });
}

async function firebaseModelPromise() {
  const ledMatrixData = await get(child(ref(db), "ledMatrix"));
  if (ledMatrixData.exists()) {
    const ledMatrixArray = Object.values(ledMatrixData.val());
    return new PixLEDModel(ledMatrixArray);
  }

  return new PixLEDModel();
}

async function getGroupName(groupId) {
  const groups = await get(ref(db, "groups/"));

  const group = Object.values(groups.val()).find(
    (group) => group.groupId === groupId
  );

  return group.groupName;
}

async function getGroupMembers(groupId) {
  const groups = await get(ref(db, "groups/"));

  const group = Object.values(groups.val()).find(
    (group) => group.groupId === groupId
  );

  return group.members;
}

async function getPosts() {
  const post = await get(ref(db, "historyOfChanges/"));
  return Object.values(post.val());
}

export {
  auth,
  firebaseModelPromise,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  getGroupName,
  getGroupMembers,
  getPosts,
};
