import { lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import Fallback from './components/common/Fallback'
import Index from './pages/Index'
import NewGroup from './pages/NewGroup'
import ThemeSelector from './components/ThemeSelector.'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'
import RequireAuth from './components/RequireAuth'
import UserLogged from './components/UserLogged'
import RedirectIfUserIsLogged from './components/RedirectIfUserIsLogged'

const GroupLazy = lazy(() => import('./pages/Group'))

const FirstScreen = () => {
    const { session } = useAuth()

    console.log('FirstScreen...')

    return session ? <Redirect to='/profile' /> : <Index />
}

const NavBar = () => {
    const { session, signOut } = useAuth()

    console.log('Navbar..')

    return (
        <div className='absolute right-0 p-5 md:right-24 md:top-4 flex items-center gap-10'>
            {session && <UserLogged signOut={signOut} />}

            <ThemeSelector />
        </div>
    )
}

function App() {
    useEffect(() => console.log('render App!'))
    return (
        <>
            <NavBar />

            <Switch>
                <Route path='/' component={FirstScreen}>
                    {/* <Index /> */}
                </Route>
                <Route path='/newGroup'>
                    <NewGroup />
                </Route>
                <Route path='/group/:id'>
                    <Suspense fallback={<Fallback />}>
                        <GroupLazy />
                    </Suspense>
                </Route>

                {/* Ruta protegida */}
                <Route path='/profile' component={RequireAuth} />

                <Route path='/login' component={RedirectIfUserIsLogged}></Route>
                {/* will match everything else */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App
