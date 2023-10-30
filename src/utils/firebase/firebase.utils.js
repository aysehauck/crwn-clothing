import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC5m-nvm6ui-JXOb9Ar5T9BkWDPQlWn8EY",
  authDomain: "crwn-clothing-db-56aaf.firebaseapp.com",
  projectId: "crwn-clothing-db-56aaf",
  storageBucket: "crwn-clothing-db-56aaf.appspot.com",
  messagingSenderId: "70557128395",
  appId: "1:70557128395:web:d1e0704ea6becfad16ed4e"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }



  return userDocRef;
};