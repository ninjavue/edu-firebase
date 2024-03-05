import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyB5z_18DC8xot0fVBQT8xyuxcXI3-JByqc",
    authDomain: "vue-firebase-crud-94ab6.firebaseapp.com",
    projectId: "vue-firebase-crud-94ab6",
    storageBucket: "vue-firebase-crud-94ab6.appspot.com",
    messagingSenderId: "4918160160",
    appId: "1:4918160160:web:c40d8d80cd6ae4f630c545",
    measurementId: "G-XV7YEQEWFZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);