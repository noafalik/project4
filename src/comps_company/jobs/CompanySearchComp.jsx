import React, { useEffect, useRef, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

const CompanySearchComp = ({ setUrl, setPagesUrl }) => {
    const idRef = useRef();
    const titleRef = useRef();
    const categoryRef = useRef();
    const maxRef = useRef();
    const minRef = useRef();
    const locationRef = useRef();
    const visaRef = useRef();
    const approvedRef = useRef();
    const [categoriesAr, setCategoriesAr] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=Infinity";
        try {
            const data = await doApiGet(url);
            setCategoriesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const onSub = (e) => {
        e.preventDefault();
        console.log(approvedRef.current.value)
        const address = API_URL + "/jobs/myJobs?" + (titleRef.current.value && "s=" + titleRef.current.value)+(idRef.current.value&&"&id="+idRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (approvedRef.current.value && "&approved=" + approvedRef.current.value);
        console.log(address);
        setUrl(address);
        setPagesUrl(API_URL + "/jobs/count?" + (titleRef.current.value && "s=" + titleRef.current.value)+(idRef.current.value&&"&id="+idRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (approvedRef.current.value && "&approved=" + approvedRef.current.value));
    }
    return (
        <form onSubmit={onSub} className='shadow my-4 p-2 d-flex gap-2 text-center align-items-center'>
            <div>
                <label>ID</label>
                <br />
                <input type='text' className='form-control' ref={idRef}></input>
            </div>
            <div>
                <label>Job title/info</label>
                <br />
                <input type='text' className='form-control' ref={titleRef}></input>
            </div>
            <div>
                <label>Category</label>
                <br />
                <select className='select-box' ref={categoryRef}>
                    <option value={""}>All</option>
                    {categoriesAr.map((item, i) => {
                        return (
                            <option key={i} value={item.category_name}>{item.category_name}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label>Min salary</label>
                <br />
                <input type='number' className='form-control' ref={minRef} defaultValue={0}></input>
            </div>
            <div>
                <label>Max salary</label>
                <br />
                <input defaultValue={100000000} type='number' className='form-control' ref={maxRef}></input>
            </div>
            <div>
                <label>Location</label>
                <br />
                <input type='text' className='form-control' ref={locationRef}></input>
            </div>
            <div>
                <label>Visa</label>
                <br />
                <input type='text' className='form-control' ref={visaRef}></input>
            </div>
            <div>
                <label>Approved</label>
                <br />
                <select className='select-box' ref={approvedRef}>
                    <option value={""}>All</option>
                    <option value={"true"}>Approved</option>
                    <option value={"false"}>Not approved</option>
                </select>
            </div>
            <button type="submit" className='btn-light btn text-info h-25'>Find</button>
        </form>
    )
}


export default CompanySearchComp