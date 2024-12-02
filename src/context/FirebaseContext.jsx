import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseApp from '../db/firebase';

const FirebaseContext = createContext(null);

export const useFirebaseContext = () => useContext(FirebaseContext);

export const FirebaseContextProvider = ({children}) => {
    
    //current app user
    const [ appUser, setAppUser] = useState(null);
 
    // get auth instance
    const auth = getAuth(firebaseApp);


    async function signup(email,password){
        const userCredential = 
            await createUserWithEmailAndPassword(auth,email,password)
        // console.log("Sign Up Success :: User Credential :: ", userCredential);
        return userCredential;
    }

    async function signin(email,password) {

        const userCredential = 
            await signInWithEmailAndPassword(auth,email,password);
        // console.log("Sign In Success :: User Credential :: ", userCredential);
        return userCredential;
    }

    async function signout() {
        await signOut(auth);
        console.log("Sign Out Success");
        return true;
    }

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if(user){
                setAppUser(user);
                // console.log("Firebase auth state changed to  :: ", auth);
            }else{
                //user is signed out
                setAppUser(null);
                // console.log("Firebase auth state changed to  :: ", auth);
            }
        });
    },[])

    const ERROR_CODES = {
        "auth/email-already-in-use" : "User already exist",
        "auth/invalid-credential" : "Email or password is wrong.",
        "auth/weak-password" : "Password should be at least 6 characters.",
        "auth/invalid-email" : "Email is invalid.",
        "auth/password-does-not-meet-requirements": "Password must contain at least 8 characters, a lower case character, an upper case character, a non-alphanumeric character.",
        
    }
    
    return (
        <FirebaseContext.Provider value={{signup,signin,signout,appUser, ERROR_CODES}}>
            {children}
        </FirebaseContext.Provider>
    );
}