import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";

import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const db = getDatabase();
