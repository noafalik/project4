import React from 'react';
import RecentJobsList from '../comps_user/jobs/recentJobsList';
import JobItem from '../comps_user/jobs/jobItem';
// import '../App.css';

const Home = () => {
    return (
        // <main className='container-fluid'>
        <>
            <main className="container-fluid background-video">
                <video autoPlay muted loop className="video-element">
                    <source src="/design/homeMainB.mp4" type="video/mp4" />
                </video>
                <div className='content'>
                    <h1 className='display-2 ' style={{color:'#5C2018', fontWeight:'bolder'}}>ReloMatch</h1>
                </div>
            </main>
            <div className='container d-flex justify-content-center align-item-center'>
                <h2 className='display-5'>Recent Jobs</h2>
            </div>
            <div className='container'>
                <RecentJobsList />
            </div>

        </>

    )
}

export default Home