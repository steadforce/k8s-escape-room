import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Room from './Room'
import StartScreen from './StartScreen'
import Endscreen from './Endscreen'
import { AddonRoutes, useRegisterAddonPuzzles }  from '../AddonLoader'
import './App.css'

function App() {
    useRegisterAddonPuzzles();

    return (
        <>
            <Routes>
                <Route path='/' element={<Room/>} />
                <Route path='/start' element={<StartScreen/>} />
                <Route path='/end' element={<Endscreen/>} />

                {AddonRoutes.map(
                    ({ path, element }: { path: string; element: React.ReactNode }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<Suspense fallback={<div>Lade Feature…</div>}>{element}</Suspense>}
                        />
                    )
                )}
            </Routes>
        </>
    )
}

export default App
