import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import RecommendVideosList from '../comps_client/videoInfo/recommendVideosList';
import { toast } from 'react-toastify';
import { JobContext } from '../../context/jobContext';
import JobItem from './jobItem';
import { API_URL, doApiGet, doApiMethod  } from '../../services/apiService';
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
    <div className='container-fluid py-4'>
    <div className="container">
      {itemJob.img_url &&
        <div className="row">
          <div className="col-lg-4">
            {/* <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${getMovieCode(itemJob.video_url)}?controls=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
          </div>
          <article className="col-lg-8">
            <div>
              <h2>{itemJob.job_title}</h2>
              <p>Info: {itemJob.info} </p>
              <div>Category:
                <Link className='text-primary ms-1 text-decoration-underline' to={`/category/${itemJob.category}`}>{itemJob.category}</Link>
              </div>
              <div>salary: {itemJob.salary}</div>
              <div className='mt-2'>
                <a className='btn btn-info me-3' target="_blank" href={itemJob.img_url}>Link to movie page</a>
                {/* {(favs_ar.includes(itemJob._id)) ?
                  <button className='btn btn-danger' onClick={() => {
                    localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                  }}>Remove from favorite</button>

                  :
                  <button className='btn btn-dark' onClick={() => {
                    localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                  }}>Add to favorite</button>
                } */}
              </div>

            </div>
          </article>
        </div>
      }
      {loading && <Loading />}
    </div>
    {/* {itemJob.category_code &&
      <RecommendVideosList currentVideoId={itemJob._id} category={itemJob.category_code} />
    } */}
  </div>
  )
}

export default JobInfo