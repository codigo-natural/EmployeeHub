import { Link } from "react-router-dom"
import { useState } from "react"

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <Link to="/" className="text-xl font-bold text-gray-800">Code With Camilo_Dev</Link>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="mt-8">
          <Link 
            to="/dashboard" 
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}
            title={!isSidebarOpen ? "Dashboard" : ""}
          >
            <span className="material-icons mr-2">dashboard</span>
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link 
            to="/employees" 
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}
            title={!isSidebarOpen ? "Manage Employees" : ""}
          >
            <span className="material-icons mr-2">people</span>
            {isSidebarOpen && <span>Manage Employees</span>}
          </Link>
          <Link 
            to="/categories" 
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}
            title={!isSidebarOpen ? "Category" : ""}
          >
            <span className="material-icons mr-2">category</span>
            {isSidebarOpen && <span>Category</span>}
          </Link>
          <Link 
            to="/profile" 
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}
            title={!isSidebarOpen ? "Profile" : ""}
          >
            <span className="material-icons mr-2">person</span>
            {isSidebarOpen && <span>Profile</span>}
          </Link>
          <button 
            className={`flex items-center w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-gray-900 ${!isSidebarOpen && 'justify-center'}`}
            title={!isSidebarOpen ? "Logout" : ""}
          >
            <span className="material-icons mr-2">logout</span>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Main content */}
      {/* ... (el resto del código permanece igual) ... */}
    </div>
  )
}