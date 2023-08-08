import React, { useRef } from 'react'
import { API_URL } from '../../services/apiService';

const ContendersSearch = ({ setUrl, setPagesUrl }) => {
    const jobIdRef = useRef();
    const userNameRef = useRef();
    const jobTitleRef = useRef();
    const searchRef = useRef();

    const onSub = (e) => {
        e.preventDefault();
        const address = API_URL + "/contenders?" + (jobIdRef.current.value && "job_id=" + jobIdRef.current.value) + (userNameRef.current.value && "&user_name=" + userNameRef.current.value) + (jobTitleRef.current.value && "&job_title=" + jobTitleRef.current.value) + (searchRef.current.value && "&s=" + searchRef.current.value)
        console.log(address);
        setUrl(address);
        setPagesUrl(API_URL + "/contenders/count?" + (jobIdRef.current.value && "job_id=" + jobIdRef.current.value) + (userNameRef.current.value && "&user_name=" + userNameRef.current.value) + (jobTitleRef.current.value && "&job_title=" + jobTitleRef.current.value) + (searchRef.current.value && "&s=" + searchRef.current.value));
    }
    return (
        <form onSubmit={onSub} className='my-4 p-2 d-flex flex-wrap gap-3 text-center justify-content-center align-items-center text-white rounded-4 col-8 mx-auto' style={{ backgroundColor: '#5C2018' }}>
            <div>
                <label>Job ID</label>
                <br />
                <input type='text' className='form-control' ref={jobIdRef}></input>
            </div>
            <div>
                <label>Job title/info</label>
                <br />
                <input type='text' className='form-control' ref={jobTitleRef}></input>
            </div>
            <div>
                <label>Contender's name</label>
                <br />
                <input type='text' className='form-control' ref={userNameRef}></input>
            </div>
            <div>
                <label>Search in notes</label>
                <br />
                <input type='text' className='form-control' ref={searchRef}></input>
            </div>
            <div className='col-12'>
                <button type="submit" className='btn btn-light my-3'><h5 className='m-0' style={{ color: '#5C2018' }} >Find!</h5></button>
            </div>
        </form>
    )
}

export default ContendersSearch