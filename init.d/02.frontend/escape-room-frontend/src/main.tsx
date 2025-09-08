import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './views/App.tsx'
import { GameStateContextProvider } from './components/GameStateContext.tsx';
import MagicCursor from './components/MagicCursor.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <MagicCursor />
      <GameStateContextProvider>
        <App />
      </GameStateContextProvider>
    </Router>
  </StrictMode>
)
