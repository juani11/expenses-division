import { Route } from 'wouter'
import Index from './pages/Index'
import { lazy, Suspense } from 'react'
import LoadingSVG from './components/svg/LoadingSVG'

const NewGroupLazy = lazy(() => import('./pages/NewGroup'))
const GroupLazy = lazy(() => import('./pages/Group'))

function App() {
    return (
        <>
            <Route path='/'>
                <Index />
            </Route>
            <Suspense fallback={<LoadingSVG />}>
                <Route path='/newGroup'>
                    <NewGroupLazy />
                </Route>
                <Route path='/group/:id'>
                    <GroupLazy />
                </Route>
            </Suspense>
        </>
    )
}

export default App
