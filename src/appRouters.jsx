import React, { useContext } from 'react'
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
import Signup from './comp_general/signup'
import UserInfo from './comps_user/userInfo'
import HeaderCompany from './comps_company/HeaderCompany'
import CompanyInfo from './comps_company/CompanyInfo'
import EditCompanyInfo from './comps_company/EditCompanyInfo'
import MyJobsList from './comps_company/jobs/myJobsList'
import EditJob from './comps_company/jobs/EditJob'
import AddJob from './comps_company/jobs/AddJob'
import ContendersList from './comps_company/contenders/ContendersList'

export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<HeaderUser />} />
                <Route path='/admin/*' element={<HeaderAdmin />} />
                <Route path='/company/*' element={<HeaderCompany />} />
            </Routes>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobPage />} />
                <Route path="/jobs/:id" element={<JobInfo />} />
                <Route path="/match" element={<MatchPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userinfo" element={<UserInfo />} />

                <Route path="/admin" element={<LoginAdmin />} />
                {localStorage["user"]&&(JSON.parse(localStorage["user"])).role == "admin" && <>
                    <Route path="/admin/users" element={<UsersList />} />
                    <Route path="/admin/companies" element={<CompaniesList />} />
                    <Route path="/admin/categories" element={<CategoriesList />} />
                    <Route path="/admin/categories/add" element={<AddCategory />} />
                    <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
                    <Route path="/admin/jobs" element={<JobsList />} />
                </>}

                <Route path='/company' element={<CompanyInfo/>}/>
                <Route path='/company/editInfo/:id' element={<EditCompanyInfo/>}/>
                <Route path='/company/myJobs' element={<MyJobsList/>}/>
                <Route path='/company/editJob/:id' element={<EditJob/>}/>
                <Route path='/company/addJob' element={<AddJob/>}/>
                <Route path='/company/myContenders' element={<ContendersList/>}/>
            </Routes>
        </BrowserRouter>
    )
}
 