import React from 'react'
import { useForm } from "react-hook-form";
import { searchJobs } from '../../api/jobApi';
import { useDispatch } from 'react-redux';
import { searchJobList } from '../../store/jobSlice';

const SearchJobs = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        dispatch(searchJobList({ ...data, page: 1 }));
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className='bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'
        >
            <input {...register("title")}
                placeholder='Job title'
                className='border p-2 rounded'
            />
            <input {...register("location")}
                placeholder='Location'
                className='border p-2 rounded'
            />
            <input {...register("skills")}
                placeholder='Skills'
                className='border p-2 rounded'
            />
            <div className="flex gap-2">
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Search
                </button>
                <button type="button"
                    className='bg-red-500  text-white rounded px-4 py-2'
                    onClick={() => {
                        reset();
                        window.location.reload(true);
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    )
};

export default SearchJobs;