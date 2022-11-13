import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import initialiseFirebaseClient from "../firebase";

const app = initialiseFirebaseClient();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore }
