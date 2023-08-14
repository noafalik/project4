import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs'
import { useForm } from "react-hook-form"
import { API_URL, doApiMethod } from '../services/apiService';
import { toast } from 'react-toastify';

const LeaveComment = ({setNewComment, newComment}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [stars, setStars] = useState(0);

    const onSub = async (_bodyData) => {
        try {
            const url = API_URL + "/comments";
            _bodyData.stars = stars;
            const data = await doApiMethod(url, "POST", _bodyData);
            console.log(data);
            if (data._id) {
                toast.success("Comment added");
                console.log(newComment);
                setNewComment(!newComment);
            }
        } catch (error) {
            console.log(error);
            alert("There is a problem");
        }
    }

    return (
        <div className='bg-white rounded-3 p-5 mb-2'>
            <h5>Leave your review here:</h5>
            <form onSubmit={handleSubmit(onSub)}>
                <div>
                    <button type='button' className='btn btn-white' onClick={() => setStars(1)}><BsFillStarFill className={stars >= 1 ? 'text-warning' : 'text-dark'} /></button>
                    <button type='button' className='btn btn-white' onClick={() => setStars(2)}><BsFillStarFill className={stars >= 2 ? 'text-warning' : 'text-dark'} /></button>
                    <button type='button' className='btn btn-white'
                        onClick={() => setStars(3)}><BsFillStarFill className={stars >= 3 ? 'text-warning' : 'text-dark'} /></button>
                    <button type='button' className='btn btn-white' onClick={() => setStars(4)}><BsFillStarFill className={stars >= 4 ? 'text-warning' : 'text-dark'} /></button>
                    <button type='button' className='btn btn-white' onClick={() => setStars(5)}><BsFillStarFill className={stars >= 5 ? 'text-warning' : 'text-dark'} /></button>
                </div>
                <input type='text' className='form-control' placeholder='Write your comment here...' {...register("content", { maxLength: 150 })} />
                <div className='p-2'><button type='submit' className='btn btn-dark mt-2 float-end'>Publish</button></div>
            </form>
        </div>
    )
}

export default LeaveComment