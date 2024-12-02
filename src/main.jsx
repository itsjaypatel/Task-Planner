import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthContextProvider } from './context/AuthContext'
import { FirebaseContextProvider } from './context/FirebaseContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <FirebaseContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </FirebaseContextProvider>
    </BrowserRouter>
  // </StrictMode>,
)
