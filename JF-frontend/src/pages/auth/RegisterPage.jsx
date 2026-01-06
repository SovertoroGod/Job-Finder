import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../validation/authSchema';
import { useDispatch } from 'react-redux';
import { register as registerUser } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });

    const role = watch("role");
    const onSubmit = (data) => {
        navigate('/login');
        dispatch(registerUser(data));
    };

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='bg-white p-6 rounded shadow w-96'
            >
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input
                    {...register("name")}
                    placeholder='Name'
                    className='input'
                />
                <input
                    {...register("email")}
                    placeholder='Email'
                    className='input mt-3'
                />
                <input
                    type='password'
                    {...register("password")}
                    placeholder='Password'
                    className='input mt-3'
                />
                <select {...register("role")} defaultValue="Candidate" className='input mt-3'>
                    <option value="Candidate">Candidate</option>
                    <option value="Recruiter">Recruiter</option>
                </select>

                {role === 'Recruiter' && (
                    <input
                        {...register("companyName")}
                        placeholder='Company Name'
                        className='input mt-3'
                    />
                )}
                <button className='bg-green-500 text-white w-full py-2 mt-4 rounded'>
                    Register
                </button>
                <div className="mt-2"><span>If you already have account, </span><Link to='/login' className="text-blue-600">login here!</Link></div>
            </form>
        </div>
    )
};

export default RegisterPage;