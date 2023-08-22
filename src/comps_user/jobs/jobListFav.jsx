import React, { useEffect, useState } from 'react';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import JobItem from './jobItem';
import Loading from '../../comp_general/loading';
import { useUserData } from '../../hooks/useUserData';
import JobItemLod from '../loading/jobItemLod';

const JobListFav = () => {
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUserData();
    const [length, setLength] = useState(0);


    useEffect(() => {
        doApi();
    }, [user]);

    const doApi = async () => {
        try {
            // const userData = JSON.parse(localStorage.getItem(TOKEN_KEY) || null);
            setLoading(true);
            const userData = user;
            console.log(userData);

            if (userData.favs_ar) {
                const url = API_URL + "/jobs/group_in"
                const data = await doApiMethod(url, "POST", { favs_ar: userData.favs_ar })
                setAr(data);
                setLength(userData.favs_ar.length);
                console.log("fav exist");
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
        setLoading(false)
    }

    return (
        <>
            {loading ?
                <div className='container-fluid'>

                    <div className="row justify-content-center align-item-center mt-3">
                        <JobItemLod />
                        <JobItemLod />
                        <JobItemLod />
                        <JobItemLod />
                    </div>
                </div>
                :
                <>
                    {localStorage.getItem(TOKEN_KEY) !== null ? (
                        <div className='container-fluid'>
                            {length > 0 &&
                                <div className='container d-flex justify-content-center align-item-center'>
                                    <h2 className='display-5 m-1'>Favorite Jobs</h2>
                                </div>
                            }
                            <div className="row justify-content-center align-item-center mt-3">
                                {ar.map(item => (
                                    <JobItem key={item._id} item={item} />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </>
            }
        </>
    )
}

export default JobListFav;




