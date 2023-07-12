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
    const newRole = userInfo.role == "admin"? "user":"admin";
    try {
      const url = `${API_URL}/users/changeRole/${userInfo._id}/${newRole}`;
      const data = await doApiMethod(url, "PATCH");
      if(data.modifiedCount){
        doApi();
      }
    } catch (error) {
      
    }
  }
  
    return (
      <div className='container mt-5'>
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
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.birth_year}</td>
                  <td>{item.nickname}</td>
                  <td><button onClick={() => changeRole(item)} style={{background:item.role=="admin"?"orange":"silver"}}>{item.role}</button></td>
                  <td><button className='bg-danger'>X</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default UsersList