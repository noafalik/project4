import React, { useEffect, useState, useContext } from 'react';
import AuthUser from './authUser';
import { API_URL, doApiGet, doApiMethod } from '.././services/apiService';
import { useUserData } from '../hooks/useUserData';
import Loading from '../comp_general/loading';
import JobListFav from './jobs/jobListFav';
import AppliedJobsList from './jobs/appliedJobsList';
import { Link } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { GoDownload } from 'react-icons/go';
import LinkedInBadge from './linkedIn/linkedInBadge';

const UserInfo = () => {
    const [itemInfo, setItemInfo] = useState({});
    const { user } = useUserData();

    const downloadFile = (
        filePath
    ) => {
        fetch(filePath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement('a');
                link.href = url;
                link.download = "my_CV.pdf";

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            });
    }


    return (
        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
            <AuthUser />

            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white m-0'>USER INFO</h1>
            </div>
            <div className='container d-flex justify-content-center '>

                <div className='container-fluid col-md-8'>
                    <div className="container col-md-6 mx-auto py-4">
                        {user.full_name ?
                            <>
                                <h4 className='h3'><strong>Account name:</strong> {user.full_name}</h4>
                                <h4 className='h3'><strong>Birth year:</strong> {user.birth_date.substring(0, 10)} </h4>
                                <h4 className='h3'><strong>Email:</strong> {user.email}</h4>
                                <h4 className='h3'><strong>Gender:</strong> {user.gender}</h4>
                                <h4 className='h3'><strong>Signup date:</strong> {user.date_created ? user.date_created.substring(0, 10) : user.createdAt.substring(0, 10)}</h4>
                                {user.CV_link.includes('http') ?
                                    <h4 className='h3'>
                                        <strong>Resume: </strong>
                                        <button onClick={() => downloadFile(user.CV_link)} className='rounded-3 btn-download'><GoDownload /> Download</button>
                                    </h4>
                                    :
                                    <h4 className='h3'>
                                        <strong>Resume:</strong>
                                        <Link to={"/editUserInfo/" + user._id} > add resume</Link>
                                    </h4>
                                }
                                {user.linkedIn_url !== "" ?
                                    <div className='container'>

                                        <LinkedInBadge />
                                    </div>
                                    :
                                    <h4 className='h3'>
                                        <strong>LinkedIn:</strong>
                                        <Link to={"/editUserInfo/" + user._id} > add LinkedIn url</Link>
                                    </h4>
                                }





                            </> : <Loading />}
                    </div>
                </div>
                <div className='container col-auto ' style={{ maxHeight: '50px' }}>
                    <button className='btn text-center' style={{ backgroundColor: '#d1cf60' }}><Link className='text-black text-decoration-none' to={"/editUserInfo/" + user._id}> <BsPencil /> </Link></button>
                </div>

            </div>
            <div className='container '>
                <JobListFav />
            </div>
            <div className='container'>
                <AppliedJobsList />
            </div>

        </div>
    )
}

export default UserInfo

