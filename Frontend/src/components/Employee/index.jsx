import { Link } from "react-router-dom"
import { Button } from "../Shared/Button"

export const Employee = () => {
  return (
    <div className='px-5 mt-3'>
      <h3 className='flex justify-center font-semibold text-2xl'>
        Employee List
      </h3>
      <Button>
        <Link to="/dashboard/add_employee">Add Employee</Link>
      </Button>
    </div>
  )
}
