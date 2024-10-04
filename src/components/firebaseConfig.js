// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database"; // Import update

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC43fjg9e2nX028y9v_q4iXrsUL38K2RhM",
  authDomain: "recycle-788c3.firebaseapp.com",
  databaseURL: "https://recycle-788c3-default-rtdb.firebaseio.com",
  projectId: "recycle-788c3",
  storageBucket: "recycle-788c3.appspot.com",
  messagingSenderId: "155983941763",
  appId: "1:155983941763:web:a992ab51238dc94d688bb6",
  measurementId: "G-SRQLCV8WLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the necessary Firebase services
export { app, getDatabase, ref, set, push, onValue, remove, update }; // Include update in the exports

// Function to update data in the database
export const updateData = (path, data) => {
  const db = getDatabase(app);
  const updates = {};
  updates[path] = data; // Create an update object

  return update(ref(db), updates)
    .then(() => {
      console.log('Data updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating data: ', error);
    });
};
