import { Redirect } from 'wouter'
import useAuth from '../hooks/useAuth'
import Login from '../pages/Login'

const RedirectIfUserIsLogged = () => {
    const { session } = useAuth()

    console.log('auth dentro de RedirectIfUserIsLogged..', session)

    return !session ? <Login /> : <Redirect to='/' />
}
export default RedirectIfUserIsLogged
