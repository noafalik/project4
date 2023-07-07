import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CompaniesList = () => {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [ar, setAr] = useState([]);

    useEffect(() => {
      doApi();
    }, [query])
  
    const doApi = async () => {
      const page = query.get("page") || 1;
      const url = API_URL + "/companies/companiesList?page="+page;
      try {
        const data = await doApiGet(url);
        setAr(data);
      }
      catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className='container mt-5'>
        <h1 className='display-4'>List of companies in system</h1>
        <PagesBtns apiUrl={API_URL+"/companies/count"} linkTo={"/admin/companies?page="} cssClass="btn btn-primary ms-2"/>
        <table className='table table-striped table-hover table-info'>
          <thead>
            <tr>
              <th>#</th>
              <th>user_id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item,i) => {
              return(
                <tr key={item._id}>
                  <td>{i+1}</td>
                  <td>{item.user_id}</td>
                  <td>{item.company_name}</td>
                  <td>{item.contactPhone}</td>
                  <td>{item.state}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
}

export default CompaniesList