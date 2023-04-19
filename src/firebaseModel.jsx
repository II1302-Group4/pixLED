import * as firebase from "firebase/app";
import { getDatabase, get, child, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./firebaseConfig";

import PixLEDModel from "./PixLEDModel";

firebase.initializeApp(firebaseConfig);

const db = getDatabase();
const auth = getAuth();

function updateFirebaseFromModel(model) {
    model.addObserver(async function (payload) {
        if (payload) {
            if (payload.hasOwnProperty("ledColor")) {
                set(
                    ref(db, "ledMatrix/" + payload.ledNumber),
                    payload.ledColor
                );
            }
        }
    });
}

function updateModelFromFirebase(model) {
    const ledMatrixRef = ref(db, "ledMatrix");
    onValue(ledMatrixRef, (firebaseData) => {
        model.setGridArray(Object.values(firebaseData.val()));
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

export {
    auth,
    firebaseModelPromise,
    updateFirebaseFromModel,
    updateModelFromFirebase,
};
