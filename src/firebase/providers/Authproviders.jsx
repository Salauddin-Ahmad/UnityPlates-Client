import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useState, useEffect } from "react";
import auth from "../firebase.config";
  
  export const AuthContext = createContext();
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  

    //   create new user
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
    //  sign in existing user
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // google and github login
    const googleLogin = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider);
    };
    const gitHubLogin = () => {
      setLoading(true)
      return signInWithPopup(auth, gitHubProvider);
    };
    // sign out
    const logOut = () => {
      setUser(null);
      signOut(auth);
    };
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }

    // obsever
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          createUser,
          signInUser,
          loading,
          gitHubLogin,
          googleLogin,
          logOut,
          updateUserProfile
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  