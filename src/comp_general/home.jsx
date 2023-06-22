import React from 'react';
import RecentJobsList from '../comps_user/jobs/recentJobsList';
// import '../App.css';

const Home = () => {
    return (
        <main className='container-fluid'>
            <div className='container-fluid videoBack'>
                {/* <video autoPlay loop muted className="container-fluid video-background">
                    <source src="/design/homeMainB.mp4" type="video/mp4" />
                </video> */}
                <div className='container d-flex justify-content-center align-item-center mb-5 mt-4'>
                    <h1 className='display-2 '>ReloMatch</h1>
                </div>
                <div className='container d-flex justify-content-center align-item-center'>
                    <h2 className='display-5'>Recent Jobs</h2>
                </div>
                <div className='container'>
                    <RecentJobsList />
                </div>



            </div>
        </main >
    )
}

export default Home