import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

export default function EditCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [item,setItem] = useState({});
  const params = useParams();
  const nav = useNavigate();
  

  useEffect(() => {
    doApiInit();
  },[])

  // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
  const doApiInit = async() => {
    try {
      const url = API_URL+"/categories/single/"+params["id"];
      const data = await doApiGet(url);
      console.log(data);
      setItem(data);
    
    } catch (error) {
      console.log(error);
    }
  }

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData);
  }

  const doApiEdit = async (_bodyData) => {
    try {
      const url = API_URL + "/categories/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        toast.success("category updated");
        nav("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      alert("there problem");
    }
  }


  return (
    <div className='container'>
      <h1>Edit category form</h1>
      {item.category_name ? 
      <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 border p-2" >
        <label>name</label>
        <input defaultValue={item.category_name} {...register("category_name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>info</label>
        <textarea defaultValue={item.info} {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <button className='btn btn-warning mt-3'>Update</button>
      </form> : <h2>Loading...</h2> }
    </div >
  )
}
