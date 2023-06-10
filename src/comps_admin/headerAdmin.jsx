import React from 'react'
import { Link } from 'react-router-dom'

const HeaderAdmin = () => {
    return (
        <header className='bg-info py-1 px-5 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='col-2 h-100 logo'>
                <div className='h-100 col-3' style={{ backgroundImage: `url("./design/logo1.png")`, backgroundPosition: "center", backgroundSize: "cover" }}>
                </div>
            </div>
            <nav className='d-flex justify-content-between align-items-center'>
                <ul className='list-unstyled d-flex justify-content-between align-items-center gap-5'>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/jobs">Jobs</Link></li>
                    <li><Link to="/admin/companies">Companies</Link></li>
                    <li><Link to="/admin/categories">Categories</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderAdmin