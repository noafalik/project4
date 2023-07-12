import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PagesBtns = (props) => {
  const [pages, setPages] = useState(0);
  const count = props.count;

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const url = props.apiUrl;
      const resp = await axios.get(url);
      console.log(resp.data);
      setPages(resp.data.pages);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <span>Page: </span>
      {[...Array(pages)].map((item,i)=>{
        return(
          <Link key={i} to={props.linkTo+(i+1)} className={props.cssClass}>{i+1}</Link>
        )
      })}
    </div>
  )
}

export default PagesBtns