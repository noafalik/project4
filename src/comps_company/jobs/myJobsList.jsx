import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import CompanySearchComp from './CompanySearchComp';
import SearchComp from '../../comp_general/SearchComp';

const MyJobsList = () => {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [ar, setAr] = useState([]);
  const page = query.get("page") || 1;
  const [url, setUrl] = useState(API_URL + "/jobs/myJobs");
  const [pagesUrl, setPagesUrl] = useState(API_URL + "/jobs/count?company_id="+JSON.parse(localStorage["company"])._id);

  useEffect(() => {
      doApi();
  }, [page,url])

  const doApi = async () => {
      try {
          console.log(url)
          const data = await doApiGet(url+(page==1?"":"&page="+page));
          console.log(data);
          setAr(data);
      }
      catch (error) {
          console.log(error);
      }
  }

  return (
      <div className='container mt-5'>
          <h1 className='display-4'>My jobs</h1>
          <Link to="/company/addJob" className='btn btn-info my-2'>Add job</Link>
          <CompanySearchComp setUrl={setUrl} setPagesUrl={setPagesUrl}/>
          <PagesBtns apiUrl={pagesUrl} linkTo={"/company/myJobs?page="} cssClass="btn btn-primary ms-2" />
          <table className='table table-striped table-hover table-info'>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Job title</th>
                      <th>Category</th>
                      <th>Info</th>
                      <th>Salary</th>
                      <th>Location</th>
                      <th>Visa</th>
                      <th>Approved</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {ar.map((item, i) => {
                      const page = query.get("page") || 1;
                      return (
                          <tr key={item._id}>
                              <td>{(page - 1) * 5 + i + 1}</td>
                              <td>{item._id}</td>
                              <td>{item.job_title}</td>
                              <td>{item.category}</td>
                              <td title={item.info}>{item.info && item.info.substring(0, 15)}</td>
                              <td>{item.salary}</td>
                              <td>{item.location}</td>
                              <td>{item.visa}</td>
                              <td><div className="text-center" style={{ background: item.approved ? "green" : "red" }}>{item.approved ? "approved" : "approve"}</div></td>
                              <td><button className='bg-info' onClick={() => nav("/company/editJob/"+item._id)}>Edit</button></td>
                              <td><button className='bg-danger'>X</button></td>
                          </tr>
                      )
                  })}
              </tbody>
          </table>
      </div>
  )
}

export default MyJobsList