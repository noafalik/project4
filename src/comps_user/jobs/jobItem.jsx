import React from 'react';
import { Link } from 'react-router-dom';


const JobItem = (props) => {
    const item = props.item;
    return (
        <div className='col-md-3'>
            <Link to={"/jobs/" + item._id} style={{ textDecoration: 'none' }}>
                <div className='job_item_box shadow rounded-3 h-100' style={{ backgroundColor: '#5C2018', color: 'white' }}>
                    <div className='job_img' style={{ minHeight: "140px", backgroundImage: `url(${item.img_url})`, backgroundSize: 'cover', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.28)' }}>
                            <h4 className='display-6 p-2 text-center' style={{ fontSize: '2em', color: '#fff' }}>
                                {item.category}
                            </h4>
                            <h3 className='display-6 p-2 text-center' style={{ fontSize: '1.5em', color: '#fff' }}>
                                {item.job_title}
                            </h3>
                        </div>
                    </div>
                    <h4 className='display-6 p-1 text-center' style={{ fontSize: '1em', color: '#fff' }}>
                        {item.location}</h4>
                </div>
            </Link>
        </div>
    )
}

export default JobItem