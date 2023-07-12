import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useEffect } from 'react';
import SearchComp from '../../comp_general/SearchComp';

const JobsList = () => {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/jobs?");

    useEffect(() => {
        doApi();
    }, [page,url])

    const doApi = async () => {
        try {
            console.log(url)
            const data = await doApiGet(url+(page==1?"":"&page="+page));
            console.log(data);
            setAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const changeApproval = async (job) => {
        const approved = job.approved == true ? false : true;
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
        <div className='container mt-5'>
            <h1 className='display-4'>List of users in system</h1>
            <SearchComp func={setUrl} />
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
                        const page = query.get("page") || 1;
                        return (
                            <tr key={item._id}>
                                <td>{(page - 1) * 5 + i + 1}</td>
                                <td>{item.job_title}</td>
                                <td>{item.category}</td>
                                <td title={item.info}>{item.info && item.info.substring(0, 15)}</td>
                                <td>{item.salary}</td>
                                <td>{item.location}</td>
                                <td>{item.visa}</td>
                                <td><button onClick={() => changeApproval(item)} style={{ background: item.approved ? "green" : "red" }}>{item.approved ? "approved" : "approve"}</button></td>
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