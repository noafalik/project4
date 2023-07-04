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
    doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/users/login";
      const data = await doApiMethod(url, "POST", _bodyData)
      console.log(data);
      if (data.token) {
        toast.success("Welcome, you logged in")
        nav("/admin/users")
      }
    }
    catch (err) {
      console.log(err);
      alert("User or password is wrong!");
    }
  }
  return (
    <div style={{ marginTop: '70px' }}>
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
          {errors.email && <div className="text-danger">* Enter valid email</div>}
          <label>password</label>
          <input {...register("password", { required: true, minLength: 3 })} className="form-control" type="text" />
          {errors.password && <div className="text-danger">* Enter valid password (min 3 chars)</div>}
          <div className='text-center'>

            <button className='btn btn-dark mt-3 '>Log in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MatchPage