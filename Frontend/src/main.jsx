import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Css/index.css'
import { Login } from './components/Auth/Login/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Login />
  </React.StrictMode>,
)
