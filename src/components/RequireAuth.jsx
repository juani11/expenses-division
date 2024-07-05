import { Redirect } from 'wouter'
import useAuth from '../hooks/useAuth'
import UserProfile from '../pages/UserProfile'

const RequireAuth = () => {
    const { session } = useAuth()

    console.log('auth dentro de RequireAuth..', session)

    return !session ? <Redirect to='/login' replace /> : <UserProfile />
}

export default RequireAuth
