import React, { useEffect } from 'react';
import RecentJobsList from '../comps_user/jobs/recentJobsList';
import JobItem from '../comps_user/jobs/jobItem';
import JobListFav from '../comps_user/jobs/jobListFav';
import { useUserData } from '../hooks/useUserData';
// import '../App.css';

const Home = () => {
    const { user } = useUserData();
    useEffect(() => {
        // doApiUser();

    }, [user])

    return (
        // <main className='container-fluid'>
        <div style={{ minHeight:'100vh'}}>
            <main className="container-fluid background-video">
                <video autoPlay muted loop className="video-element">
                    <source src="/design/homeMainB.mp4" type="video/mp4" />
                </video>
                <div className='content'>
                    <h1 className='display-2 ' style={{ color: '#5C2018', fontWeight: 'bolder' }}>ReloMatch</h1>
                </div>
            </main>
            <div className='container d-flex justify-content-center align-item-center'>
                <h2 className='display-5 m-2'>Recent Jobs</h2>
            </div>
            
            <div className='container-fluid '>
                <div className='container my-4'>
                    <RecentJobsList />
                </div>
                {user ?
                    <div className='container my-4'>
                        <JobListFav />
                    </div>
                    :
                    null
                }
            </div>

        </div>

    )
}

export default Home