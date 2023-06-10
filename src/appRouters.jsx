import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './comp_general/welcome'
import HeaderAdmin from './comps_admin/headerAdmin'
import LoginAdmin from './comps_admin/LoginAdmin'
import UsersList from './comps_admin/users/UsersList'
import CompaniesList from './comps_admin/companies/CompaniesList'
import CategoriesList from './comps_admin/categories/CategoriesList'
import AddCategory from './comps_admin/categories/AddCategory'
import EditCategory from './comps_admin/categories/EditCategory'
import JobsList from './comps_admin/jobs/JobsList'

export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/*' element={<HeaderAdmin />} />
            </Routes>
            <Routes>
                <Route path="/" element={<Welcome />} />

                <Route path="/admin" element={<LoginAdmin />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/companies" element={<CompaniesList />} />
                <Route path="/admin/categories" element={<CategoriesList />} />
                <Route path="/admin/categories/add" element={<AddCategory />} />
                <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
                <Route path="/admin/jobs" element={<JobsList />} />
            </Routes>
        </BrowserRouter>
    )
}
