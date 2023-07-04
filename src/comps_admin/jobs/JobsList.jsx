import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useEffect } from 'react';

const JobsList = () => {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;

    useEffect(() => {
        doApi();
    }, [query])

    const doApi = async () => {
        const url = API_URL + "/jobs?page=" + page;
        try {
            const data = await doApiGet(url);
            setAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const changeApproval = async (job) => {
        const approved = job.approved == true?false:true;
        try {
            const url = `${API_URL}/jobs/changeApproval/${job._id}/${approved}`;
            const data = await doApiMethod(url, "PATCH");
            if (data.modifiedCount) {
                console.log(approved)
                doApi();
            }
        } catch (error) {

        }
    }

    return (
        <div className='container'>
            <h1 className='display-4'>List of users in system</h1>
            <PagesBtns apiUrl={API_URL + "/jobs/count"} linkTo={"/admin/jobs?page="} cssClass="btn btn-primary ms-2" />
            <table className='table table-striped table-hover table-info'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Job title</th>
                        <th>Category</th>
                        <th>Info</th>
                        <th>Salary</th>
                        <th>Location</th>
                        <th>Approved</th>
                        <th>Visa</th>
                        <th>Del/Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{i + 1}</td>
                                <td>{item.job_title}</td>
                                <td>{item.category}</td>
                                <td title={item.info}>{item.info&&item.info.substring(0, 15)}</td>
                                <td>{item.salary}</td>
                                <td>{item.location}</td>
                                <td>{item.visa}</td>
                                <td><button onClick={() => changeApproval(item)} style={{ background: item.approved ? "green" : "red" }}>{item.approved?"approved":"approve"}</button></td>
                                <td><button className='bg-danger'>X</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default JobsList