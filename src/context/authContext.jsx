import { createContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)

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
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('session actual: ', session)
            setSession(session)
        })

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('event ', _event)
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ session, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
    )
}

export default AuthContextProvider
