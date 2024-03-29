import { createContext, useEffect, useState } from 'react'
import { SUPABASE_LS_AUTH_KEY, supabase } from '../services/supabase'

export const AuthContext = createContext()

const isUserInStorage = window.localStorage.getItem(SUPABASE_LS_AUTH_KEY)

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loadingSession, setLoadingSession] = useState(true)

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        if (error) {
            console.log('error en signIn: ', error)
        }
        console.log('data despues de signIn: ', data)
    }

    const signOut = async () => {
        const { data, error } = await supabase.auth.signOut()
        if (error) {
            console.log('error en signOut: ', error)
        }

        console.log('data despues de signOut: ', data)
        setSession(null)
    }

    console.log('isUserInStorage', isUserInStorage)

    useEffect(() => {
        // setLoadingSession(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('session actual: ', session)
            setSession(session.user.user_metadata)
            setLoadingSession(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ session, loadingSession, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
