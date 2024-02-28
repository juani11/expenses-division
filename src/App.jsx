import { lazy, Suspense, useEffect } from 'react'
import { Route, Switch } from 'wouter'
import Fallback from './components/common/Fallback'
import Index from './pages/Index'
import NewGroup from './pages/NewGroup'
import ThemeSelector from './components/ThemeSelector.'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'

const GroupLazy = lazy(() => import('./pages/Group'))

const FirstScreen = () => {
    const { session } = useAuth()

    useEffect(() => console.log('render FirstScreen!'))

    console.log('session: ', session)

    // return session ? <Index /> : <Login />

    return <Index />
}
function App() {
    useEffect(() => console.log('render App!'))
    return (
        <>
            <ThemeSelector />

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
                <Route path='/login'>
                    <Login />
                </Route>
                {/* will match everything else */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App
