import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function useAuthContext(){
    return useContext(AuthContext);
} 

export function AuthContextProvider({children}){
    
    const [logOutModelVisiblity,setLogOutModelVisiblity] = useState(false);
    
    
    return <AuthContext.Provider value={{logOutModelVisiblity,setLogOutModelVisiblity}}> {children}
    </AuthContext.Provider>;
    
}