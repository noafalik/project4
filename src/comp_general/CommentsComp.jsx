import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'
import { SlLike } from 'react-icons/sl'
import { BsFillStarFill } from 'react-icons/bs'
import LeaveComment from './LeaveComment';
import Carousel from 'react-bootstrap/Carousel';

const CommentsComp = () => {
    const [commentsAr, setCommentsAr] = useState([]);
    const [newComment, setNewComment] = useState(false);
    const [page, setPage] = useState(1);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        doApi();
    }, [newComment])

    const doApi = async () => {
        try {
            const URL = API_URL + "/comments?page=" + page;
            const data = await doApiGet(URL);
            if (data.length < 5) setShowMore(false);
            const comments = [...commentsAr, ...data]
            setCommentsAr(comments);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
            alert("There is a problem");
        }
    }

    const likeComment = async (_id) => {
        try {
            const url = API_URL + "/comments/inc/" + _id;
            const data = await doApiMethod(url, "PATCH");
            console.log(data);
            doApi();
        } catch (error) {
            console.log(error);
            alert("There is a problem");
        }
    }

    return (
        <div className='container mb-5 col-12' data-bs-theme="dark">
            <h3 className='display-4 text-center text-dark'>Our customers reviews:</h3>
            <div>
                {localStorage["user"] &&
                    <LeaveComment setNewComment={setNewComment} newComment={newComment} />
                }
                <Carousel fade>
                    {commentsAr.map(item => {
                        const stars = new Array(item.stars).fill(null);
                        return (
                            <Carousel.Item className='px-0 px-lg-5 col-12 col-md-6' key={item._id}>
                                <div className='bg-light rounded-3 d-block' style={{ padding: '80px' }}>
                                    <p className='float-end'>{item.updatedAt.substring(0, 10)}</p>
                                    <p>{item.user_id.full_name}</p>
                                    {stars.map((star, index) => {
                                        return (
                                            <BsFillStarFill key={index} className='text-warning pe-1' />
                                        )
                                    })}
                                    <h5 className='text-dark'>{item.content}</h5>
                                    {localStorage["user"] && <button className='float-end btn btn-white' onClick={() => likeComment(item._id)}><SlLike /> {item.likes.length}</button>}
                                </div>
                            </Carousel.Item>
                        )
                    })}
                    <Carousel.Item className='px-0 px-lg-5 col-12 col-md-6'>
                        <div className='bg-light rounded-3 d-block' style={{ padding: '128px' }}>
                            <Carousel.Caption className='my-5'>
                                {showMore ? <button className='btn btn-dark rounded-3' onClick={doApi}>
                                    <h2 className='display-6 m-0'>See more reviews</h2>
                                </button> : <h2 className='display-6 m-0 text-dark'>You've seen all the reviews</h2>
                                }
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default CommentsComp;
