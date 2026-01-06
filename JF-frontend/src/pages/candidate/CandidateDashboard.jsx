import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  return (
    <div>CandidateDashboard
      <button onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  )
};

export default CandidateDashboard

