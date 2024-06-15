import { createContext, useEffect, useState } from 'react'
import useUserGroups from '../hooks/useUserGroups'
import { supabase } from '../services/supabase'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loadingSession, setLoadingSession] = useState(false)

    const { loadingUserGroups, userGroups, retrieveUserGroups, groupsPublicId } = useUserGroups()

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

    useEffect(() => {
        setLoadingSession(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('session actual: ', session)
            setSession(session?.user.user_metadata)
            setLoadingSession(false)
        })
    }, [])

    useEffect(() => {
        if (session)
            // Recuperar grupos del usuario
            retrieveUserGroups(session?.email)
    }, [session])

    return (
        <AuthContext.Provider
            value={{
                session,
                loadingSession,
                signInWithGoogle,
                signOut,
                loadingUserGroups,
                retrieveUserGroups,
                groupsPublicId,
                userGroups
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
