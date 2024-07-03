import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { api } from '../../services/api';

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
      // if (!response.ok) {
      //   throw new Error('Failed to fetch categories');
      // }
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
        <button className='cursor-pointer bg-gradient-to-r from-[#bde0fe] to-[#a2d2ff] px-6 py-2 rounded text-white font-semibold shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-10px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] focus:shadow-[inset_-12px_-8px_40px_#46464620] transition-shadow'>
          <Link to="/dashboard/add_catgory">Add category</Link>
        </button>
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
