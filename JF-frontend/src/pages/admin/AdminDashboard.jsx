import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  return (
    <div>AdminDashboard
            <button onClick={() => dispatch(logout())}>
              Logout
            </button>
    </div>
  )
}

export default AdminDashboard