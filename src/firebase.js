import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({});

export const db = app.database();

export default app;
