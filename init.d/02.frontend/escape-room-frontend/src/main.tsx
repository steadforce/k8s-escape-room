import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './views/App.tsx'

export const GameContext = createContext(new Date())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <GameContext value={new Date()}>
        <App />
      </GameContext>
    </Router>
  </StrictMode>
)
