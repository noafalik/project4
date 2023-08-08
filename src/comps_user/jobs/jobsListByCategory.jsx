import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import JobItem from './jobItem';
import Loading from '../../comp_general/loading';
import { useParams } from 'react-router';

const JobsListByCategory = (props) => {
  const [ar,setAr] = useState([]);
  const [loading, setLoading] = useState(false);

  const {currentJobId,category} = props

  useEffect(() => {
    doApi(category);
  },[currentJobId]);

  const doApi = async(_category) => {
    try{
      const url = API_URL+"/jobs?perPage=4&approved=true&category="+_category;
      const data = await doApiGet(url);
      // מחפש אם הוידיאו המוצג תחילה קיים במערך
      const currentVidId = data.findIndex(item => item._id == currentJobId)
      // console.log(currentVidId);
      // בודק אם הסרט שהרשימה מופיעה בו נמצא במערך ואם כן יסיר אותו
      if(currentVidId > -1){
        data.splice(currentVidId,1)
      }
         // במקרה שהסרטון לא מופיע ויש יותר מ4 סרטונים
      // ברשימה
      else if(data.length > 4){
        data.splice(4);
      }
      setAr(data)
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='container-fluid py-3'>
      <div className="container">
        
        <div className="row justify-content-center">
          {ar.map(item => {
            return(
              <JobItem key={item._id} item={item} />
            )
          })}
        </div>

        {loading && <Loading />}
      </div>
    </div>
  )
}

export default JobsListByCategory;