import React from 'react'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

const RecruiterDashboard = () => {
  const dispatch = useDispatch();
  return (
    <div>RecruiterDashboard
            <button onClick={() => dispatch(logout())}>
              Logout
            </button>
    </div>
  )
}

export default RecruiterDashboard