import { lazy, Suspense } from 'react'
import { Route, Switch, useRoute } from 'wouter'
import Fallback from './components/common/Fallback'
import Loading from './components/common/Loading'
import RedirectIfUserIsLogged from './components/RedirectIfUserIsLogged'
import RequireAuth from './components/RequireAuth'
import ThemeSelector from './components/ThemeSelector.'
import UserLogged from './components/UserLogged'
import useAuth from './hooks/useAuth'
import Index from './pages/Index'
import NewGroup from './pages/NewGroup'
import NotFound from './pages/NotFound'

const GroupLazy = lazy(() => import('./pages/Group'))

const NavBar = () => {
    const { session, loadingSession, signInWithGoogle, signOut } = useAuth()
    const [match, params] = useRoute('/group/:id')
    console.log('Navbar..')

    return (
        <div className='absolute right-0 p-5 md:right-24 md:top-4 flex items-center gap-10'>
            {loadingSession ? (
                <Loading loadingText='Comprobando usuario...' inline />
            ) : session ? (
                <UserLogged userName={session?.name} signOut={signOut} />
            ) : (
                match && (
                    <p className='m-0 text-sm '>
                        <span>
                            <a
                                onClick={() =>
                                    signInWithGoogle({
                                        redirectTo: `/group/${params.id}`
                                    })
                                }
                                className='underline cursor-pointer font-bold'
                            >
                                Iniciá sesión
                            </a>
                        </span>
                        <span> para guardar este grupo 😁</span>
                    </p>
                )
            )}

            <ThemeSelector />
        </div>
    )
}

function App() {
    return (
        <>
            <NavBar />

            <Switch>
                <Route path='/'>
                    <Index />
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
