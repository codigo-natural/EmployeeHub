import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Css/index.css'
import { Login } from './components/Auth/Login/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Dashboard/index.jsx'
import { Home } from './components/Home/index.jsx'
import { Employee } from './components/Employee/index.jsx'
import { Category } from './components/Category/index.jsx'
import { Profile } from './components/Profile/index.jsx'
import { AddCategory } from './components/AddCategory/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='' element={<Home />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/category' element={<Category />} />
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/add_catgory' element={<AddCategory />} />
        </Route>
        <Route path='*' element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
