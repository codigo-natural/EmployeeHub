import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_category', { categoryName })
      .then(res => {
        if (res.data.Status) {
          navigate('/dashboard/category');
        } else {
          alert(res.data.Error)
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log('Categoría añadida:', { categoryName });
    setCategoryName('');
  };

  return (
    <div className="grid place-items-center min-h-full">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
