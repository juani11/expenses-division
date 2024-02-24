import { lazy, Suspense } from 'react'
import { Route, Switch } from 'wouter'
import Fallback from './components/common/Fallback'
import Index from './pages/Index'
import NewGroup from './pages/NewGroup'
import ThemeSelector from './components/ThemeSelector.'
import NotFound from './pages/NotFound'

const GroupLazy = lazy(() => import('./pages/Group'))

function App() {
    return (
        <>
            <ThemeSelector />

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
                {/* will match everything else */}
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default App
