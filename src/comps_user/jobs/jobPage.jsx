import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import JobItem from './jobItem';
import Loading from '../../comp_general/loading';

const JobPage = () => {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {

      const url = API_URL + "/jobs";
      const data = await doApiGet(url);
      console.log(data);
      setAr(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{marginTop:'70px'}}>
      <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
        <h1 className='display-6 text-white'>JOB OPTIONS-</h1>
      </div>
      <div className='container d-flex justify-content-center ' >
        <h3 className='display-6'>Filter by:</h3>
        
      </div>
      
      <div className='container-fluid py-3'>
        <div className="container">
          <div className="row g-4">
            {ar.map(item => {
              return (
                <JobItem key={item._id} item={item} />
                
              )
            })}
          </div>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  )
}

export default JobPage