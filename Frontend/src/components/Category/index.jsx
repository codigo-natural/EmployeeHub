import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { api } from '../../services/api';
import { Button } from '../Shared/Button';

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      // Asumimos que tienes un endpoint para obtener las categorías
      const response = await api.get('/auth/category');
      console.log(response)
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

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>

      <div className='px-5 mt-3'>
        <h3 className='flex justify-center font-semibold text-2xl'>
          category List
        </h3>
        <Button>
          <Link to="/dashboard/add_catgory">Add category</Link>
        </Button>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg my-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Category Name</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li key={category.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {category.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  )
}
