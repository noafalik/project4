import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';

export default function CategoriesList() {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;

    useEffect(() => {
        doApi();
    }, [query])

    const doApi = async () => {
        const url = API_URL + "/categories?page="+page;
        try {
            const data = await doApiGet(url);
            // console.log(data);
            setAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            if (window.confirm("Delete item?")) {
                const url = API_URL + "/categories/" + id;
                const data = await doApiMethod(url, "DELETE");
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
            <h1 className='display-4'>List of categories in system</h1>
            <Link to="/admin/categories/add" className='btn btn-info my-2'>Add category</Link>
            <PagesBtns apiUrl={API_URL+"/categories/count"} linkTo={"/admin/categories?page="} cssClass="btn btn-primary ms-2"/>
            <table className='table table-striped table-hover table-info'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>info</th>
                        <th colSpan={2}>Del/edit</th>
                    </tr>
                </thead>
                <tbody>
                    {ar.map((item, i) => {
                        return (
                            <tr key={item._id}>
                                <td>{(page-1)*5+i + 1}</td>
                                <td>{item.category_name}</td>
                                <td title={item.info}>{item.info&&item.info.substring(0, 15)}</td>
                                <td><button onClick={() => {
                                    deleteItem(item._id)
                                }} className='bg-danger'>X</button></td>
                                <td><button onClick={() => {
                                    nav(`/admin/categories/edit/`+item._id)
                                }} className='bg-info'>Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}