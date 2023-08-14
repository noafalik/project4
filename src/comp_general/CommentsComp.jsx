import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'
import { SlLike } from 'react-icons/sl'
import { BsFillStarFill } from 'react-icons/bs'
import LeaveComment from './LeaveComment'

const CommentsComp = () => {
    const [commentsAr, setCommentsAr] = useState([]);
    const [newComment, setNewComment] = useState(false);

    useEffect(() => {
        doApi();
    }, [newComment])

    const doApi = async () => {
        try {
            const URL = API_URL + "/comments";
            const data = await doApiGet(URL);
            console.log(data)
            setCommentsAr(data);
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
        <div className='container'>
            <h3 className='display-4 text-center'>Our customers reviews:</h3>
            <div className='pb-5'>
                {localStorage["user"] &&
                    <LeaveComment setNewComment={setNewComment} newComment={newComment}/>
                }
                {commentsAr.map(item => {
                    const stars = new Array(item.stars).fill(null);
                    console.log(stars)
                    return (
                        <div key={item._id} className='bg-white rounded-3 p-5 mb-2'>
                            <p className='float-end'>{item.updatedAt.substring(0, 10)}</p>
                            <p>{item.user_id.full_name}</p>
                            {stars.map((star, index) => {
                                return (
                                    <BsFillStarFill key={index} className='text-warning pe-1' />
                                )
                            })}
                            <h5>{item.content}</h5>
                            {localStorage["user"] && <button className='float-end btn btn-white' onClick={() => likeComment(item._id)}><SlLike /> {item.likes.length}</button>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CommentsComp;
