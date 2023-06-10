import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/categories";
      console.log(_bodyData)
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        toast.success("category added");
        nav("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      alert("there problem");
    }
  }

  return (
    <div className='container'>
      <h1>Add new category form</h1>
      <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 border p-2" >
        <label>Category name</label>
        <input {...register("category_name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>Info</label>
        <textarea {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <button className='btn btn-success mt-3'>Add new</button>
      </form>
    </div >
  )
}