import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBe59JoApFHihmu_OilrpvH7WxYgidymHg",
  authDomain: "focal-set-463314-e0.firebaseapp.com",
  databaseURL: "https://focal-set-463314-e0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "focal-set-463314-e0",
  storageBucket: "focal-set-463314-e0.firebasestorage.app",
  messagingSenderId: "269144917567",
  appId: "1:269144917567:web:be20fb6816fd85a99b9a8a"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
