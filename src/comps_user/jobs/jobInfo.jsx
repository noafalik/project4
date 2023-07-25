import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import RecommendVideosList from '../comps_client/videoInfo/recommendVideosList';
import { toast } from 'react-toastify';
import { JobContext } from '../../context/jobContext';
import JobItem from './jobItem';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import Loading from '../../comp_general/loading';
import { useUserData } from '../../hooks/useUserData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import JobsListByCategory from './jobsListByCategory';

const JobInfo = () => {
  // const { favs_ar, updateFav } = useContext(JobContext)
  const [itemJob, setItemJob] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const [applied, setApplied] = useState(false);

  const { favs_ar, updateFav, user, unApplay } = useUserData();

  // let category = itemJob.category;

  useEffect(() => {
    doApi();
    console.log(itemJob);
  }, [params])

  const doApi = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const url = API_URL + "/jobs/single/" + params["id"];
        const data = await doApiGet(url)
        // console.log(data);
        setItemJob(data);
        // מוסיף 1 לויוס 
        // const urlInc = API_URL + "/jobs/inc/" + params["id"];
        // const dataInc = await doApiMethod(urlInc, "patch");
        setLoading(false);

        const urlApp = API_URL + "/contenders/exists?job_id=" + params["id"];
        const dataApp = await doApiGet(urlApp)
        // console.log(dataApp)
        if (dataApp) {
          setApplied(true);
        }
        // else{
        //   setApplied(true);
        // }
      }

    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      {localStorage.getItem(TOKEN_KEY) !== null ?
        <div style={{ marginTop: '70px' }}>
          <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
            <h1 className='display-6 text-white'>JOB INFO-</h1>
          </div>
          <div className='container-fluid py-4'>
            <div className="container">
              {itemJob.img_url &&
                <div className="row">
                  <div className="col-lg-4">
                    <img src={itemJob.img_url} alt="img" width={400} />
                  </div>
                  <article className="col-lg-8">
                    <div>
                      <h2>{itemJob.job_title}</h2>
                      <div>Category:
                        {itemJob.category}
                      </div>
                      <div>Info: {itemJob.info} </div>
                      <div>Location:
                        {itemJob.location}
                      </div>
                      <div>Visa:
                        {itemJob.visa}
                      </div>
                      <div>Salary:
                        {itemJob.salary.toLocaleString()}
                      </div>
                      {user &&
                        <div className='row'>
                          <div className='mt-2 col-1'>

                            {(favs_ar.includes(itemJob._id)) ?
                              <button className='btn btn-danger' onClick={() => {
                                localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                              }}><AiFillHeart /></button>
                              :
                              <button className='btn btn-dark' onClick={() => {
                                localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                              }}><AiOutlineHeart /></button>
                            }

                          </div>
                          <div className='mt-2 col-1'>
                            {applied ?
                                <button onClick={()=>{
                                  unApplay(params["id"])
                                  setApplied(false)
                                }} className='btn btn-info' style={{ textDecoration: 'none' }}>UNAPPLY</button>
                              :
                              <Link to={"/jobs/apply/" + itemJob._id + "/" + itemJob.job_title} style={{ textDecoration: 'none' }}>
                                <button className='btn btn-dark'>APPLY</button>
                              </Link>
                            }

                          </div>
                          {/* <div className='mt-2 col-1'>

                            {(favs_ar.includes(itemJob._id)) ?
                              <button className='btn btn-info' onClick={() => {
                                localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                              }}>UNAPPLY</button>
                              :
                              <button className='btn btn-dark' onClick={() => {
                                localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                              }}>APPLY</button>
                            }

                          </div> */}
                        </div>
                      }
                    </div>

                  </article>
                  <div className='container text-center m-4'>
                    <div className='container d-flex justify-content-center col-5 mb-4' style={{ borderRadius: '5px' }}>
                      <h2 className='display-6' style={{ fontSize: '35px', color: '#5c2018', fontWeight: 'bold' }}>Other Jobs In The Same Category:</h2>
                    </div>
                    <JobsListByCategory currentJobId={itemJob._id} category={itemJob.category} />

                  </div>
                </div>
              }
              {/* {loading && <Loading />} */}
            </div>
          </div>
        </div>
        : null
      }
    </>
  )
}

export default JobInfo