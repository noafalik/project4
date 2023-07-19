import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import SearchComp from '../../comp_general/SearchComp';
import PagesBtns from '../../comp_general/PagesBtns';

const ContendersList = () => {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/contenders?");
    const [pagesUrl, setPagesUrl] = useState(API_URL + "/contenders/count?");

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

    return (
        <div className='container mt-5'>
            <h1 className='display-4'>List of users in system</h1>
            <SearchComp setUrl={setUrl} setPagesUrl={setPagesUrl}/>
            <PagesBtns apiUrl={pagesUrl} linkTo={"/company/myContenders?page="} cssClass="btn btn-primary ms-2" />
            <table className='table table-striped table-hover table-info'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Job</th>
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
                                <td>{item.job_title}</td>
                                <td>{item.category}</td>
                                <td title={item.notes}>{item.notes && item.notes.substring(0, 100)}</td>
                                <td>{item.starting}</td>
                                <td title={item.notes}>{item.notes && item.notes.substring(0, 100)}</td>
                                <td><button className='bg-danger'>X</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ContendersList