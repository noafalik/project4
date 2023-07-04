import React, { useEffect, useState, useContext } from 'react';
import AuthUser from './authUser';
import { API_URL, doApiGet, doApiMethod } from '.././services/apiService';
import { useUserData } from '../hooks/useUserData';
import Loading from '../comp_general/loading';

const UserInfo = () => {
    const [itemInfo, setItemInfo] = useState({});
    const {user} = useUserData();

    // useEffect(() => {
    //     doApi();
    // }, [])

    // const doApi = async () => {
    //     try {
    //         const url = API_URL + "/users/userInfo";
    //         const data = await doApiGet(url);
    //         setItemInfo(data);
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }
    return (
        <div style={{ marginTop: '70px' }}>
            <AuthUser />
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>USER INFO-</h1>
            </div>
            <div className='container-fluid'>
                <div className="container col-md-6 mx-auto py-4">
                    {user.full_name ?
                        <>
                            <h4 className='h3'><strong>Account name:</strong> {user.full_name}</h4>
                            <h4 className='h3'><strong>Birth year:</strong> {user.birth_date.substring(0, 10)} </h4>
                            <h4 className='h3'><strong>Email:</strong> {user.email}</h4>
                            <h4 className='h3'><strong>NickName:</strong> {user.gender}</h4>
                            <h4 className='h3'><strong>Signup date:</strong> {user.date_created ? user.date_created.substring(0, 10) : user.createdAt.substring(0, 10)}</h4>
                        </> : <Loading />}
                </div>

            </div>
        </div>
    )
}

export default UserInfo

