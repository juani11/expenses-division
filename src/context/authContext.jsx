import { createContext, useEffect, useState } from 'react'
import { getUserGroups } from '../services/services'
import { SUPABASE_LS_AUTH_KEY, supabase } from '../services/supabase'

export const AuthContext = createContext()

const isUserInStorage = window.localStorage.getItem(SUPABASE_LS_AUTH_KEY)

const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [loadingSession, setLoadingSession] = useState(false)

    const [loadingUserGroups, setLoadingUserGroups] = useState(false)
    const [userGroups, setUserGroups] = useState(null)

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
        // Solo si hay key en LS , ir a recuperar el usuario
        if (isUserInStorage) {
            console.log('isUserInStorage TRUE')
            setLoadingSession(true)
            supabase.auth.getSession().then(({ data: { session } }) => {
                console.log('session actual: ', session)
                setSession(session)
                setLoadingSession(false)
            })
        } else {
            console.log('isUserInStorage FALSE')
        }
    }, [])

    useEffect(() => {
        if (!session) console.log('No hay session, por ende no se hace el fetch de los grupos')
        else {
            console.log('Recuperar grupo del usuario actual...')
            setLoadingUserGroups(true)
            getUserGroups(session.user.email)
                .then(res => {
                    console.log('res dentro de getUserGroup() ', res)
                    // const [groupData] = res
                    setUserGroups(res)
                })
                .catch(error => {
                    console.log('error dentro de getUserGroups()', error)
                })
                .finally(() => setLoadingUserGroups(false))
        }
    }, [session])

    return (
        <AuthContext.Provider
            value={{ session, loadingSession, loadingUserGroups, userGroups, signInWithGoogle, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
