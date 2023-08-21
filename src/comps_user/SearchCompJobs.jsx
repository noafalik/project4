import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService';
import { useNavigate } from 'react-router-dom';


const SearchCompJobs = ({ setUrl, setPagesUrl }) => {

    const titleRef = useRef();
    const categoryRef = useRef();
    const companyRef = useRef();
    const maxRef = useRef();
    const minRef = useRef();
    const locationRef = useRef();
    const continentRef = useRef();
    const visaRef = useRef();
    const [companiesAr, setCompaniesAr] = useState([]);
    const [categoriesAr, setCategoriesAr] = useState([]);

    useEffect(() => {
        getCategories();
        getCompanies();
    }, [])

    const getCompanies = async () => {
        const url = API_URL + "/companies/companiesList?perPage=Infinity";
        try {
            const data = await doApiGet(url);
            setCompaniesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

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

    const resetFilter = () => {
        titleRef.current.value = "";
        categoryRef.current.value = "";
        companyRef.current.value = "";
        maxRef.current.value = "";
        minRef.current.value = "";
        locationRef.current.value = "";
        continentRef.current.value = "";
        visaRef.current.value = "";
        onSub();
    }

    const onSub = (e) => {
        e.preventDefault();

        const address = API_URL + "/jobs?" + (titleRef.current.value && "s=" + titleRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (companyRef.current.value && "&company_id=" + companyRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (continentRef.current.value && "&continent=" + continentRef.current.value);
        console.log(address);
        setUrl(address);
        setPagesUrl(API_URL + "/jobs/count?" + (titleRef.current.value && "s=" + titleRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (companyRef.current.value && "&company_id=" + companyRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (continentRef.current.value && "&continent=" + continentRef.current.value));
    }
    return (
        <form onSubmit={onSub} className='my-4 p-2 d-flex flex-wrap gap-3 text-center justify-content-center align-items-center text-white rounded-4 col-12 mx-auto' style={{ backgroundColor: '#5C2018' }}>

            <div>
                <label>Job title/info</label>
                <br />
                <input type='text' className='form-control' ref={titleRef}></input>
            </div>
            <div>
                <label>Category</label>
                <br />
                <select className='form-select' ref={categoryRef}>
                    <option value={""}>All</option>
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
                <select className='form-select' ref={companyRef}>
                    <option value={""}>All</option>
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
                <label>Continent</label>
                <br />
                <select ref={continentRef} className='form-select'>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>North-America</option>
                    <option>South-America</option>
                    <option>Australia</option>
                </select>
            </div>
            <div>
                <label>Visa: </label>
                <input type='text' className='form-control' ref={visaRef}></input>
            </div>

            <div className='col-12'>
                <button type="submit" className='btn btn-light my-3'><h5 className='m-0' style={{ color: '#5C2018' }} >Find!</h5></button>
            </div>
        </form>
       
    )
}

export default SearchComp
