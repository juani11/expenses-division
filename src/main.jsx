import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Group from './pages/Group'
import App from './App'
import NewGroup from './pages/NewGroup'
import { Route } from 'wouter'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <>
        <Route path='/'>
            <App />
        </Route>
        <Route path='/newGroup'>
            <NewGroup />
        </Route>
        <Route path='/group/:id'>
            <Group />
        </Route>
    </>
    // </React.StrictMode>
)
