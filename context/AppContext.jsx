'use client'
import { useUser } from '@clerk/nextjs';
import { createContext, useContext} from 'react'
import React from 'react'


// creating context
export const AppContext = createContext();

// export const useAppContext = () =>{
//     return useContext(AppContext)
// }

export const AppContextProvider = ({children}) =>{
    const {user} = useUser()

    const value = {
        user
    }
// wrapping context and the information..
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}