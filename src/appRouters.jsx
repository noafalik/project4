import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderAdmin from './comps_admin/headerAdmin'
import LoginAdmin from './comps_admin/LoginAdmin'
import UsersList from './comps_admin/users/UsersList'
import CompaniesList from './comps_admin/companies/CompaniesList'
import CategoriesList from './comps_admin/categories/CategoriesList'
import AddCategory from './comps_admin/categories/AddCategory'
import EditCategory from './comps_admin/categories/EditCategory'
import JobsList from './comps_admin/jobs/JobsList'
import HeaderUser from './comps_user/headerUser'
import JobPage from './comps_user/jobs/jobPage'
import MatchPage from './comps_user/match/matchPage'
import AboutPage from './comps_user/aboutUs/aboutPage'
import FlightsPage from './comps_user/flights/FlightsPage'
import LoginUser from './comps_user/loginUser'
import Home from './comp_general/home'
import JobInfo from './comps_user/jobs/jobInfo'

export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<HeaderUser />} />
                <Route path='/admin/*' element={<HeaderAdmin />} />
            </Routes>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/jobs/:id" element={<JobInfo />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/login" element={<LoginUser />} />


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
