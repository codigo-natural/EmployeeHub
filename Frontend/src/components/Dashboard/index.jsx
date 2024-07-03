import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import dashboard from '../../../public/dashboard.png'
import ManageEmploteers from '../../../public/interviewer.png'
import home from '../../../public/home.png'
import category from '../../../public/category.png'
import profile from '../../../public/person.png'
import logout from '../../../public/exit.png'

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <Link to="/" className="text-xl font-bold text-gray-800">Camilo_Dev</Link>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {isSidebarOpen ? '←' : <div className="flex flex-row items-center"><img src={home} alt="home" className="h-10 w-10 mr-2" />→</div>}
          </button>
        </div>
        <nav className="mt-8">
            <Link to="/dashboard" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}>
              <img src={dashboard} alt="Logo" className="h-6 w-6 mr-2" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Link>
          <Link to="/dashboard/employee" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={ManageEmploteers} alt="manage employees" className="h-6 w-6 mr-2" />
            {isSidebarOpen && <span>Manage Employees</span>}
          </Link>
          <Link to="/dashboard/category" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={category} alt="category" className="h-6 w-6 mr-2" />
            {isSidebarOpen && <span>Category</span>}
          </Link>
          <Link to="/dashboard/profile" className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={profile} alt="profile" className="h-6 w-6 mr-2" />
            {isSidebarOpen && <span>Profile</span>}
          </Link>
          <button className={`flex items-center w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={logout} alt="logout" className="h-6 w-6 mr-2" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl text-center font-bold text-gray-900">Dashboard - Employee Management System</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Aquí puedes agregar tus gráficas y otros elementos */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {/* Placeholder para gráficas */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}