import { Link } from 'react-router-dom'

export const Category = () => {
  return (
    <div className='px-5 mt-3'>
      <div className='flex justify-center'>
        category
      </div>
      <button className='cursor-pointer bg-gradient-to-r from-[#bde0fe] to-[#a2d2ff] px-6 py-2 rounded text-white font-semibold shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-10px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] focus:shadow-[inset_-12px_-8px_40px_#46464620] transition-shadow'>
        <Link to="/dashboard/add_catgory">Add category</Link>
      </button>
    </div>
  )
}
