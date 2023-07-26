import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import ContendersSearch from './ContendersSearch';

const ContendersList = () => {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/contenders?");
    const [pagesUrl, setPagesUrl] = useState(API_URL + "/contenders/count?");

    useEffect(() => {
        doApi();
    }, [page, url])

    const doApi = async () => {
        try {
            console.log(url)
            const data = await doApiGet(url + (page == 1 ? "" : "&page=" + page));
            console.log(data);
            const dataWithJobTitle = await Promise.all(
                data.map(async (item) => {
                    try{
                    const job = await doApiGet(API_URL + "/jobs/single/" + item.job_id);
                    const user = await doApiGet(API_URL + "/users/single/"+item.user_id);
                    return { ...item, job_title: job.job_title, user_name:user.full_name };
                }
                catch(error){
                    console.log(error)
                }
                })
            );
            console.log(dataWithJobTitle)
            setAr(dataWithJobTitle);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            if (window.confirm("Delete item?")) {
                const url = API_URL + "/contenders?id=" + id;
                const data = await doApiMethod(url, "DELETE");
                console.log(data);
                if (data.deletedCount) {
                    doApi();
                }
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='display-4'>My contenders</h1>
            <ContendersSearch setUrl={setUrl} setPagesUrl={setPagesUrl} />
            <PagesBtns apiUrl={pagesUrl} linkTo={"/company/myContenders?page="} cssClass="btn btn-primary ms-2" />
            <table className='table table-striped table-hover table-info'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Job ID</th>
                        <th>Job title</th>
                        <th>Notes</th>
                        <th>Starting</th>
                        <th>CV link</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        const page = query.get("page") || 1;
                        return (
                            <tr key={item._id}>
                                <td>{(page - 1) * 5 + i + 1}</td>
                                <td>{item.user_name}</td>
                                <td>{item.job_id}</td>
                                <td>{item.job_title}</td>
                                <td title={item.notes}>{item.notes && item.notes.substring(0, 100)}</td>
                                <td>{item.starting.substring(0, 10)}</td>
                                <td title={item.cv_link}><a target='_blank' href={item.cv_link && item.cv_link.substring(0, 15)}>See CV
                                </a></td>
                                <td><button className='bg-danger' onClick={() => deleteItem(item._id)}>X</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ContendersList