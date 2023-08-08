import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import JobItem from './jobItem';
import Loading from '../../comp_general/loading';

const RecentJobsList = () => {
  const [ar,setAr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApi();
  },[]);

  const doApi = async() => {
    try{

      const url = API_URL+"/jobs?perPage=4&approved=true";
      const data = await doApiGet(url);
      console.log(data);
      setAr(data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='container-fluid my-3'>
        <div className="row">
          {ar.map(item => {
            return(
              <JobItem key={item._id} item={item} />
            )
          })}
        </div>
        {loading && <Loading />}
    </div>
  )
}

export default RecentJobsList