import { lazy, Suspense } from 'react'
import { Route } from 'wouter'
import Fallback from './components/common/Fallback'
import Index from './pages/Index'
import NewGroup from './pages/NewGroup'
import ThemeSelector from './components/ThemeSelector.'

const GroupLazy = lazy(() => import('./pages/Group'))

function App() {
    return (
        <>
            <ThemeSelector />

            <Route path='/'>
                <Index />
            </Route>
            <Route path='/newGroup'>
                <NewGroup />
            </Route>
            <Suspense fallback={<Fallback />}>
                <Route path='/group/:id'>
                    <GroupLazy />
                </Route>
            </Suspense>
        </>
    )
}

export default App
