import { Link } from "react-router-dom"

const AdminNavbar = () => {
  return (
    <nav>
      <div className="admin-links">
        <ul className='flex w-full align-center bg-primary justify-center cg-30 py-20'>
          <Link to="./" className='px-4 text-white'>Dashboard</Link>
          <Link to="/admin/all-products" className='px-4 text-white'>Products</Link>
          <Link to="/admin/add-product" className='px-4 text-white'>Add Product</Link>
          <Link to="/admin/add-category" className='px-4 text-white'>Add Category</Link>
          {/* <li></li> */}
        </ul>
      </div>
    </nav>
  )
}

export default AdminNavbar
