import React from 'react'
import { Provider } from './components/ui/provider.jsx'
import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <AppRouter/>
    </Provider>
  </React.StrictMode>,
)
