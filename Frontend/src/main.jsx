import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Css/index.css'
import { Login } from './components/Auth/Login/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Dashboard/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
