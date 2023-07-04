import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import RecommendVideosList from '../comps_client/videoInfo/recommendVideosList';
import { toast } from 'react-toastify';
import { JobContext } from '../../context/jobContext';
import JobItem from './jobItem';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import Loading from '../../comp_general/loading';

const JobInfo = () => {
  // const { favs_ar, updateFav } = useContext(JobContext)
  const [itemJob, setItemJob] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams()


  useEffect(() => {
    doApi();
  }, [params])

  const doApi = async () => {
    try {
      if (!loading) {
        setLoading(true);
        const url = API_URL + "/jobs/single/" + params["id"];
        const data = await doApiGet(url)
        console.log(data);
        setItemJob(data)
        // מוסיף 1 לויוס 
        // const urlInc = API_URL + "/jobs/inc/" + params["id"];
        // const dataInc = await doApiMethod(urlInc, "patch");
        setLoading(false);
      }

    }
    catch (err) {
      console.log(err);
    }

  }

  //   const getJobCode = (_urlVideo) => {
  //     // מחפשים איפה נמצא הוי בקווארי שבתוכו יש את הקוד של הוידאו
  //     const vIndex = _urlVideo.indexOf("?v=");
  //     // אוספים רק את הוידיאו קוד
  //     const videoCode = _urlVideo.substring(vIndex + 3, 99999)
  //     return videoCode
  //   }

  return (
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

                  {/* <div className='mt-2'>
                  <a className='btn btn-info me-3' target="_blank" href={itemMovie.video_url}>Link to movie page</a>
                  {(favs_ar.includes(itemMovie._id)) ?
                    <button className='btn btn-danger' onClick={() => {
                      localStorage[TOKEN_KEY] ? updateFav(itemMovie._id) : toast.info("You need to login to add to favorite ")
                    }}>Remove from favorite</button>

                    :
                    <button className='btn btn-dark' onClick={() => {
                      localStorage[TOKEN_KEY] ? updateFav(itemMovie._id) : toast.info("You need to login to add to favorite ")
                    }}>Add to favorite</button>
                  }
                </div> */}
                  <div>Location:
                    {itemJob.location}
                  </div>
                  <div>Visa:
                    {itemJob.visa}
                  </div>
                  <div>Salary:
                    {itemJob.salary.toLocaleString()}
                  </div>
                </div>
              </article>
            </div>
          }
          {/* {loading && <Loading />} */}
        </div>
        {/* {itemMovie.category_code &&
        <RecommendVideosList currentVideoId={itemMovie._id} category={itemMovie.category_code} />
      } */}
      </div>
    </div>
  )
}

export default JobInfo