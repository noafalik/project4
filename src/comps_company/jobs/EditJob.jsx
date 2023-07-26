import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const EditJob = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState({});
    const params = useParams();
    const nav = useNavigate();
    const [categoriesAr, setCategoriesAr] = useState([]);

    useEffect(() => {
        doApiInit();
        getCategories();
    }, [])

    // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
    const doApiInit = async () => {
        try {
            const url = API_URL + "/jobs/single/" + params["id"];
            const data = await doApiGet(url);
            console.log(data);
            setItem(data);

        } catch (error) {
            console.log(error);
        }
    }
    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=Infinity";
        try {
            const data = await doApiGet(url);
            setCategoriesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiEdit(_bodyData);
    }

    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/jobs/" + params["id"];
            const data = await doApiMethod(url, "PUT", _bodyData);
            console.log(data);
            if (data.modifiedCount) {
                toast.success("job updated");
                nav("/company/myJobs");
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }


    return (
        <div className='container'>
            <h1>Edit category form</h1>
            {item.job_title ?
                <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 border p-2" >
                    <label>Job title</label>
                    <input defaultValue={item.job_title} {...register("job_title", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.job_title && <div className="text-danger">* Enter valid name</div>}
                    <label>info</label>
                    <textarea defaultValue={item.info} {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                    {errors.info && <div className="text-danger">* Enter valid info</div>}
                    <label>Category</label>
                    <br/>
                    <select {...register("category", { required: true, minLength: 2 })}>
                        {
                            categoriesAr.map((item, i) => {
                                return (
                                    <option key={i} value={item.category_name}>{item.category_name}</option>
                                )
                            })
                        }
                    </select>
                    {errors.category && <div className="text-danger">* Enter valid category</div>}
                    <br/>
                    <label>Salary</label>
                    <input defaultValue={item.salary} {...register("salary", { required: true })} className="form-control" type="number"></input>
                    {errors.salary && <div className="text-danger">* Enter valid salary</div>}
                    <label>Location</label>
                    <input defaultValue={item.location} {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.location && <div className="text-danger">* Enter valid location</div>}
                    <label>Visa</label>
                    <input defaultValue={item.visa} {...register("visa", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.visa && <div className="text-danger">* Enter valid visa info</div>}
                    <label>Job Image</label>
                    <input defaultValue={item.img_url} {...register("img_url", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
                    <label>Continent</label>
                    <input defaultValue={item.continent} {...register("continent", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.continent && <div className="text-danger">* Enter valid continent</div>}
                    <button className='btn btn-warning mt-3'>Update</button>
                </form> : <h2>Loading...</h2>}
        </div >
    )
}

export default EditJob