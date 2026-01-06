import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../store/jobSlice';
import { useNavigate } from 'react-router-dom';

const JobsLists = () => {

    const dispatch = useDispatch();
    const { jobs, pagination, loading } = useSelector((state) => state.jobs);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllJobs({ page }));
    }, [page]);

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className='text-2xl font-bold mb-6'>Jobs Opening</h1>

            {loading && <p>Loading ....</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {jobs.map((job) => (
                    <div key={job._id} className="border rounded-lg shadow-sm p-4">
                        <h2 className='text-2xl font-semibold'>{job.title}</h2>
                        <p className="text-sm text-gray-600">{job.recruiter?.companyName}</p>
                        <div className='text-sm flex justify-between items-center mt-2 '>
                            <span>Date:</span>
                            <span>{new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                        {!user &&
                            <button className='rounded-lg border px-2 py-1 mt-3 bg-orange-400 text-sm text-white font-semibold cursor-pointer' onClick={handleLogin} >Login to apply</button>
                        }
                        {
                            user?.role === 'Candidate' &&
                            <button className='rounded-lg border px-2 py-1 mt-3 bg-blue-600 text-sm text-white font-semibold'>
                                Apply
                            </button>
                        }
                        {
                            user?.role === "Admin" &&
                            <p className="text-sm text-red-600 mt-3">Admin view</p>
                        }
                    </div>
                ))}
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex gap-2 mt-6">
                    <button disabled={!pagination.hasPrevPage} onClick={() => setPage((p) => p - 1)}>
                        Prev
                    </button>
                    <span>
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button disabled={!pagination.hasNextPage} onClick={() => setPage((p) => p + 1)}>
                        Next
                    </button>
                </div>
            )}

        </div>
    )
};

export default JobsLists;