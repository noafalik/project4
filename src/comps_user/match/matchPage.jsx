import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL } from '../../services/apiService';
import { toast } from 'react-toastify';

const MatchPage = () => {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    // doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    // try {
    //   const url = API_URL + "/users/login";
    //   const data = await doApiMethod(url, "POST", _bodyData)
    //   console.log(data);
    //   if (data.token) {
    //     toast.success("Welcome, you logged in")
    //     nav("/admin/users")
    //   }
    // }
    // catch (err) {
    //   console.log(err);
    //   alert("User or password is wrong!");
    // }
  }
  return (
    <div style={{ marginTop: '70px', minHeight:'100vh' }}>
      <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
        <h1 className='display-6 text-white'>Match</h1>
      </div>
      <div className='container'>
        <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >
          <label>Continent:</label>
          <select {...register("continent")} className='m-2' name="continent">
            <option value="Asia">Asia</option>
            <option value="Africa"> Africa</option>
            <option value="Australia"> Australia</option>
            <option value="Europe"> Europe</option>
            <option value="North America"> North America</option>
            <option value="South America"> South America</option>
          </select>
          <br/>
          <label>Location</label>
          <input {...register("location", { required: true, minLength: 2 })} placeholder='Exemple: New York, USA' className="form-control" type="text" />
          {errors.location && <div className="text-danger">* Enter valid location (min 2 chars)</div>}
         
          <label>Category</label>
          <input {...register("category", { required: true, minLength: 2 })} placeholder='Exemple: Full-Stack' className="form-control" type="text" />
          {errors.category && <div className="text-danger">* Enter valid category (min 2 chars)</div>}
         
          <label>Salary Expectation</label>
          <input {...register("salary", { required: true, minLength: 1 })} placeholder='Exemple: 20,000' className="form-control" type="text" />
          {errors.salary && <div className="text-danger">* Enter valid category (min 1 number)</div>}
         
          <div className='text-center'>
            <button className='btn btn-dark mt-3 '>Find My Match</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MatchPage