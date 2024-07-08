import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../Shared/Input";

export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    salary: '',
    category_id: '',
    image: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployee();
    fetchCategories();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/auth/employee/${id}`);
      console.log(response)
      if (response.data.Status) {
        setEmployee({
          ...employee,
          name: response.data.Result[0].name,
          email: response.data.Result[0].email,
          address: response.data.Result[0].address,
          salary: response.data.Result[0].salary,
          category_id: response.data.Result[0].category_id,
          image: null
        });
      } else {
        setError("Failed to fetch employee data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/auth/category');
      if (response.data.Status) {
        setCategories(response.data.Result);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('category_id', employee.category_id);

    if (employee.image) {
      formData.append('image', employee.image);
    }
    // for (let key in employee) {
    //   formData.append(key, employee[key]);
    // }

    try {
      const response = await api.put(`/auth/update_employee/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(formData)
      console.log(response)
      if (response.data.Status) {
        navigate('/dashboard/employee'); // Redirect to employee list
      } else {
        setError(response.data.Error || "Failed to update employee");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading employee data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">

        <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter employee name"
              value={employee.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
          <div>
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
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
            <Input
              type="number"
              name="salary"
              id="salary"
              value={employee.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category_id"
              id="category_id"
              value={employee.category_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          {employee.image && (
            <div>
              <p className="text-sm text-gray-500">Current Image:</p>
              <img src={`/images/${employee.image}`} alt="Current employee" className="mt-2 w-32 h-32 object-cover rounded-md" />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
