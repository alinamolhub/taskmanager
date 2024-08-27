import { React,Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import { AuthProvider } from './contexts/auth-context'
import App from './App'

import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <>
    <HashRouter>
    <AuthProvider><App /></AuthProvider>
    </HashRouter>
  </>,
)
