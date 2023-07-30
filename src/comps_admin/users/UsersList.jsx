import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useNavigate, useSearchParams } from 'react-router-dom';

const UsersList = () => {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [ar, setAr] = useState([]);
  const page = query.get("page") || 1;

    useEffect(() => {
      doApi();
    }, [query])
  
    const doApi = async () => {
      const url = API_URL + "/users/usersList?page="+page;
      try {
        const data = await doApiGet(url);
        setAr(data);
      }
      catch (error) {
        console.log(error);
      }
    }
  
  const changeRole = async(userInfo) => {
    try {
      const url = `${API_URL}/users/changeRole/${userInfo._id}`;
      const data = await doApiMethod(url, "PATCH");
      JSON.parse(localStorage["user"]).role = data.newRole;
      if(data.modifiedCount){
        doApi();
      }
    } catch (error) {
      
    }
  }

  const deleteItem = async (id) => {
    try {
        if (window.confirm("Delete item?")) {
            const url = API_URL + "/users/" + id;
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
      <div className='container mt-5' style={{ minHeight:'100vh'}}>
        <h1 className='display-4'>List of users in system</h1>
        <PagesBtns apiUrl={API_URL+"/users/count"} linkTo={"/admin/users?page="} cssClass="btn btn-primary ms-2"/>
        <table className='table table-striped table-hover table-info'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birth year</th>
              <th>Nick name</th>
              <th>Role</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item,i) => {
              return(
                <tr key={item._id}>
                  <td>{i+1}</td>
                  <td>{item.full_name}</td>
                  <td>{item.email}</td>
                  <td>{item.birth_date.substring(0,10)}</td>
                  <td>{item.gender}</td>
                  <td><button onClick={() => changeRole(item)} style={{background:item.role=="admin"?"orange":"silver"}}>{item.role}</button></td>
                  <td><button className='bg-danger' onClick={() => deleteItem(item._id)}>X</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default UsersList