import firebase from "firebase";

export const config = {
  apiKey: "AIzaSyAclKYpk3Ov_nRZYAayyJGRZyo5f-yFBV8",
  databaseURL: "https://cryptolancer-76419.firebaseio.com/",
  projectId: "cryptolancer-76419"
};

firebase.initializeApp(config);

export default firebase;
