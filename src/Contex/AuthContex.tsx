import {createContext,useEffect,useState} from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged , User } from 'firebase/auth';
import ProtectedRoute from '../models/ProtectedRoute';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({children} : ProtectedRoute) => {
    const [currentUser,setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            console.log(user);
        })

        return () => {
            unsub();
        }
    },[])
    return(
    <AuthContext.Provider value={currentUser}>
        {children}
    </AuthContext.Provider>
    )
}

