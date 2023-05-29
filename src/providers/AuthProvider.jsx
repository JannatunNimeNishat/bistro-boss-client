import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    //google signUp
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false);
            setUser(currentUser)
            //get and set token
            if (currentUser) {
                
                //using axios instead of fetch
                //no need to use method,headers, body in axios
                axios.post('http://localhost:5000/jwt',{email: currentUser.email})
                .then(data =>{
                    // console.log(data.data.token);
                    localStorage.setItem('access-token',data.data.token)
                })
                
                // const loggedInUser = { email: currentUser.email }
                /* fetch(`http://localhost:5000/jwt`, {
                    method: 'GET',
                    headers: {
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(loggedInUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data)) */
            }
            else{
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;