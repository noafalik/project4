import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { API_URL, doApiGet } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const SearchComp = ({setUrl, setPagesUrl}) => {
    const titleRef = useRef();
    const categoryRef = useRef();
    const companyRef = useRef();
    const maxRef = useRef();
    const minRef = useRef();
    const locationRef = useRef();
    const visaRef = useRef();
    const approvedRef = useRef();
    const [companiesAr, setCompaniesAr] = useState([]);
    const [categoriesAr, setCategoriesAr] = useState([]);   

    useEffect(() => {
        getCategories();
        getCompanies();
    }, [])

    const getCompanies = async () => {
        const url = API_URL + "/companies/companiesList";
        try {
            const data = await doApiGet(url);
            setCompaniesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        const url = API_URL + "/categories";
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
        const address = API_URL+"/jobs?"+(titleRef.current.value&&"s="+titleRef.current.value)+(categoryRef.current.value&&"&category="+categoryRef.current.value)+(companyRef.current.value&&"&company_id="+companyRef.current.value)+(minRef.current.value&&"&minSalary="+minRef.current.value)+(maxRef.current.value&&"&maxSalary="+maxRef.current.value)+(locationRef.current.value&&"&location="+locationRef.current.value)+(visaRef.current.value&&"&visa="+visaRef.current.value)+(approvedRef.current.value&&"&approved="+approvedRef.current.value);
        console.log(address);
        setUrl(address);
        setPagesUrl(API_URL+"/jobs/count?"+(titleRef.current.value&&"s="+titleRef.current.value)+(categoryRef.current.value&&"&category="+categoryRef.current.value)+(companyRef.current.value&&"&company_id="+companyRef.current.value)+(minRef.current.value&&"&minSalary="+minRef.current.value)+(maxRef.current.value&&"&maxSalary="+maxRef.current.value)+(locationRef.current.value&&"&location="+locationRef.current.value)+(visaRef.current.value&&"&visa="+visaRef.current.value)+(approvedRef.current.value&&"&approved="+approvedRef.current.value));
    }
    return (
        <form onSubmit={onSub} className='shadow my-4 p-2 d-flex gap-2 text-center align-items-center'>
            <div>
                <label>Job title/info</label>
                <br />
                <input type='text' className='form-control' ref={titleRef}></input>
            </div>
            <div>
                <label>Category</label>
                <br />
                <select className='select-box' ref={categoryRef}>
                    <option value={""}>test</option>
                    {categoriesAr.map((item, i) => {
                        return (
                            <option key={i} value={item.category}>{item.category_name}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label>Company</label>
                <br />
                <select className='select-box' ref={companyRef}>
                    <option value={""}>test</option>
                    {companiesAr.map((item, i) => {
                        return (
                            <option key={i} value={item._id}>{item.company_name}</option>
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

export default SearchComp