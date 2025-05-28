import { Routes, Route } from 'react-router-dom'
import Room from './Room'
import Startscreen from './Startscreen'
import Endscreen from './Endscreen'
import './App.css'

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Room/>} />
                <Route path='/start' element={<Startscreen/>} />
                <Route path='/end' element={<Endscreen/>} />
            </Routes>
        </>
    )
}

export default App
