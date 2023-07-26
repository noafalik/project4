import React from 'react';
import AuthUser from '../comps_user/authUser';
import { useUserData } from '../hooks/useUserData';
import Loading from '../comp_general/loading';
import { Link } from 'react-router-dom';

const CompanyInfo = () => {
    const { user, company } = useUserData();

    return (
        <div style={{ marginTop: '70px' }}>
            <AuthUser />
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>COMPANY INFO</h1>
            </div>
            <div className='container-fluid'>
                <div className="container col-md-6 mx-auto py-4">
                    <div className='container d-flex justify-content-center mb-3'>
                        <button className='btn btn-dark text-center'><Link className='text-white text-decoration-none' to={"/company/editInfo/" + JSON.parse(localStorage["company"])._id}>Edit my Info</Link></button>
                    </div>
                    {user.full_name ?
                        <>
                            <h4 className='h3'><strong>Email:</strong> {user.email}</h4>
                            <h4 className='h3'><strong>Signup date:</strong> {user.date_created ? user.date_created.substring(0, 10) : user.createdAt.substring(0, 10)}</h4>
                        </> : <Loading />}
                    {company.company_name ?
                        <>
                            <h4 className='h3'><strong>Company name:</strong> {company.company_name}</h4>
                            <h4 className='h3'><strong>Contact phone:</strong> {company.contactPhone} </h4>
                            <h4 className='h3'><strong>State:</strong> {company.state}</h4>
                            <h4 className='h3'><strong>Logo:</strong> <div style={{ backgroundImage: "url(" + company.logo_url + ")", height: "200px", width: "200px", backgroundPosition: "center", backgroundSize: "cover" }} /></h4>
                        </> : <Loading />}
                </div>

            </div>
        </div>
    )
}

export default CompanyInfo

