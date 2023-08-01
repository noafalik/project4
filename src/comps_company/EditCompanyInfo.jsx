import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import { JobContext } from '../context/jobContext';
import { imgToString } from '../services/cloudinaryServive';

export default function EditCompanyInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState({});
    const params = useParams();
    const nav = useNavigate();
    const { setCompany } = useContext(JobContext);
    const uploadRef = useRef();
    let imgUrl;

    useEffect(() => {
        doApiInit();
    }, []);

    const doApiUpload = async () => {
        try {
            const myFile = uploadRef.current.files[0];
            // הופך את הקובץ למידע כסטרינג
            const imgData = await imgToString(myFile);
            const url = "http://localhost:3001/upload/cloud";
            const resp = await doApiMethod(url, "POST", { image: imgData })
            console.log(resp);
            console.log(resp.data.secure_url)
            imgUrl = resp.data.secure_url;
        }
        catch (err) {
            console.log(err);
            alert("There problem , come back later")
        }
    }

    // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
    const doApiInit = async () => {
        try {
            setItem(JSON.parse(localStorage["company"]));
        } catch (error) {
            console.log(error);
        }
    }

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        await doApiUpload();
        doApiEdit(_bodyData);
    }

    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/companies/" + params["id"];
            _bodyData.logo_url = imgUrl;
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                _bodyData._id = params["id"];
                setCompany(_bodyData);
                localStorage.setItem("company", JSON.stringify(_bodyData));
                toast.success("company updated");
                nav("/company");
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }


    return (
        <div className='container-fluid pt-5'>
            <div className='container mt-5'>
                <h1 className='mt-5'>Edit company info</h1>
                {item.company_name ?
                    <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 border p-2" >
                        <label>Company Name</label>
                        <input defaultValue={item.company_name} {...register("company_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.company_name && <div className="text-danger">* Enter valid name</div>}
                        <label>Contact phone</label>
                        <textarea defaultValue={item.contactPhone} {...register("contactPhone", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                        {errors.contactPhone && <div className="text-danger">* Enter valid phone</div>}
                        <label>State</label>
                        <textarea defaultValue={item.state} {...register("state", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                        {errors.state && <div className="text-danger">* Enter valid state</div>}
                        <label>Logo url</label>
                        <input ref={uploadRef} type="file" className='form-control' />
                        {errors.logo_url && <div className="text-danger">* Enter valid phone</div>}
                        <button className='btn btn-warning mt-3'>Update</button>
                    </form> : <h2>Loading...</h2>}
            </div >
        </div>
    )
}
