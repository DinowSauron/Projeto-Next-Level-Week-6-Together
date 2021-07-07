import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";


type AuthContextType = {
user: UserType | undefined;
signInWithGoogle: () => Promise<void>; //promise pois é async
}

type UserType = {
id: string;
name: string;
avatar: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthProviderProps){
    
  const [user, setUser] = useState<UserType>()

  useEffect(() => { // auto-login
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = user;
  
        if(!displayName || !photoURL) {
          throw new Error("Missing information from Google Account (photo and name).")
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    //nos event listener, sempre tenha certeza de desativa-los, colocando numa variavel e retornando como void
    return () => {
      unsubscribe();
    }
  }, [])//com array vazio dispara apenas 1x

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if(result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error("Missing information from Google Account (photo and name).")
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
       
  }





    return (
        
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}