import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/adminlogin', values)
      .then(result => {
        navigate('/dashboard')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)' }}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">EmployeeHub</h2>

              <p className="max-w-xl mt-3 text-gray-300">Crea y administra tus empleos con esta plataforma intuitiva y amigable para el usuario, gestionar tus empleados es una tarea tediosa con esta plataforma no batallaras mas con este tipo de tareas</p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">EmployeeHub</h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">Log into EmployeeHub to access your account</p>
            </div>

            <div className="mt-8">
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div
                  className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
                  />
                </div>

                <div
                  className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-white"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Log in
                  </button>
                </div>

              </form>
              <div className="mt-2">
                <input type="checkbox" name="tick" id="tick" className="mr-2" />
                <label htmlFor="tick" className="text-sm text-gray-600 dark:text-gray-200">You are Agree with terms & conditions</label>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
