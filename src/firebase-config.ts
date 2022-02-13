import { initializeApp } from "firebase/app";
import {collection, CollectionReference, getFirestore} from "@firebase/firestore";
import { Vehicle } from "./data/vehicles";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_Firebase_apikey,
  authDomain: process.env.REACT_APP_Firebase_authDomain,
  projectId: process.env.REACT_APP_Firebase_projectId,
  storageBucket: process.env.REACT_APP_Firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_Firebase_messagingSenderId,
  appId: process.env.REACT_APP_Firebase_appId,
  measurementId: process.env.REACT_APP_Firebase_measurementId
};




const app = initializeApp(firebaseConfig)


export const db = getFirestore(app);

export const vehicleCollectionRef = collection(db, "vehicles") as CollectionReference<Vehicle>