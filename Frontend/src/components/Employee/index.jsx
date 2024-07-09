import { useState } from 'react'
import { Link } from "react-router-dom"
import { Button } from "../Shared/Button"
import { useEffect } from "react"
import { api } from "../../services/api"

export const Employee = () => {
  const [employees, setEmployess] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchEmployee()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/auth/delete_employee/${id}`)
      if (response.data.Status) {
        // fetchEmployee()
        // navigate('/dashboard/employee')
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchEmployee = async () => {
    try {
      setLoading(true)
      const response = await api.get('/auth/employee')
      console.log(response)
      if (response.data.Status) {
        const data = await response.data.Result;
        setEmployess(data)
      }
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (loading) return <p>Loading Employees...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='px-5 mt-3'>
      <h3 className='flex justify-center font-semibold text-2xl'>
        Employee List
      </h3>
      <Button>
        <Link to="/dashboard/add_employee">Add Employee</Link>
      </Button>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <img
                  src={`http://localhost:3000/images/` + employee.image}
                  alt={employee.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{employee.name}</h3>
                <p className="text-gray-600 mb-2">{employee.email}</p>
                <p className="text-sm text-gray-500 mb-2">{employee.address}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-indigo-600 font-medium">${employee.salary}</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {employee.category_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/dashboard/edit_employee/${employee.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
