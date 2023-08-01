import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { imgToString } from '../../services/cloudinaryServive';

export default function AddJob() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const [categoriesAr, setCategoriesAr] = useState([]);
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef();
    let imgUrl;

    useEffect(() => {
        getCategories();
    }, [])

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        await doApiUpload();
        doApiPost(_bodyData);
    }

    const doApiUpload = async () => {
        try {
            setLoading(true)
            const myFile = uploadRef.current.files[0];
            // הופך את הקובץ למידע כסטרינג
            const imgData = await imgToString(myFile);
            const url = "http://localhost:3001/upload/cloud";
            const resp = await doApiMethod(url, "POST", { image: imgData })
            console.log(resp);
            console.log(resp.data.secure_url)
            imgUrl = resp.data.secure_url;
            setLoading(false)
        }
        catch (err) {
            console.log(err);
            alert("There problem , come back later")
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

    const doApiPost = async (_bodyData) => {
        try {
            const url = API_URL + "/jobs";
            console.log(_bodyData)
            console.log(imgUrl)
            _bodyData.img_url = imgUrl;
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                toast.success("job added");
                nav("/company/myJobs");
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container'>
            <h1>Add new job</h1>
            <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 border p-2" >
                <label>Job title</label>
                <input {...register("job_title", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.name && <div className="text-danger">* Enter valid job title</div>}
                <label>Info</label>
                <textarea {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                {errors.info && <div className="text-danger">* Enter valid info</div>}
                <label>Category</label>
                <br />
                <select className='select-box' {...register("category", { required: true, minLength: 2 })}>
                    {
                        categoriesAr.map((item, i) => {
                            return (
                                <option key={i} value={item.category_name}>{item.category_name}</option>
                            )
                        })
                    }
                </select>
                {errors.category && <div className="text-danger">* Enter valid category</div>}
                <br />
                <label>Salary</label>
                <input {...register("salary", { required: true })} className="form-control" type="number"></input>
                {errors.salary && <div className="text-danger">* Enter valid salary</div>}
                <label>Location</label>
                <input {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.location && <div className="text-danger">* Enter valid location</div>}
                <label>Visa</label>
                <br />
                <select {...register("visa", { required: true })}>
                    <option value={true}>required</option>
                    <option value={false}>not required</option>
                </select>
                <br />
                {errors.visa && <div className="text-danger">* Enter valid visa info</div>}
                <label>Job Image</label>
                <input ref={uploadRef} type="file" className='form-control' />
                <label className='m-1'>Continent</label>
                <input {...register("continent", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.continent && <div className="text-danger">* Enter valid continent</div>}
                <button className='btn btn-success mt-3'>Add new</button>
                {loading && <h2>Loading...</h2>}
            </form>
        </div >
    )
}