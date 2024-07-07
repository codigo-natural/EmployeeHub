import { useEffect, useState } from "react";
import { Input } from "../Shared/Input";
import { api } from "../../services/api";
import { useNavigate } from 'react-router-dom'

export const AddEmployee = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in employee) {
      formData.append(key, employee[key]);
    }

    api.post('/auth/add_employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (response.data.Status) {
          navigate('/dashboard/employee')
        } else {
          console.error('Failed to add employee');
        }
      })
      .catch(err => console.error(err));
    // Resetear el formulario después de enviar
    setEmployee({
      name: '',
      email: '',
      password: '',
      salary: '',
      address: '',
      category_id: '',
      image: ''
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/auth/category');
      if (response.data.Status) {
        const data = await response.data.Result;
        setCategories(data);
      }
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading Employees...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid place-items-center min-h-full">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2 mt-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                name="email"
                id="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2 mt-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                name="password"
                id="password"
                value={employee.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
              <Input
                type="text"
                name="salary"
                id="salary"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Input
                type="text"
                name="address"
                id="address"
                value={employee.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category_id"
                id="category_id"
                className="mt-1 block w-full outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={employee.category_id}
                onChange={handleChange}
              >
                <option value="" className="focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Select a category</option>
                {categories.map(category => (
                  <option className="focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="inputGroupFile01"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                type="file"
                className="mt-1 block w-full"
                id="inputGroupFile01"
                name="image"
                onChange={handleChange}

              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
