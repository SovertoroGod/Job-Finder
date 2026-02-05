import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const AdminLayout = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

  return (
      <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-900 text-white p-5">
              <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
              <nav className="flex flex-col gap-5">
                  <NavLink to='/admin'
                      end
                      className={({ isActive }) =>
                          isActive ? "text-blue-400" : "text-gray-300"
                    }>
                      Dashboard
                  </NavLink>
                  <NavLink to="/admin/jobs"
                      className={({ isActive }) =>
                          isActive ? "text-blue-400" : "text-gray-300"
                    }>
                      Jobs
                  </NavLink>
                  <NavLink to="/admin/users"
                      className={({ isActive }) =>
                          isActive ? "text-blue-400" : "text-gray-300"
                  }>
                      Users
                  </NavLink>
                  <button
                      onClick={() => dispatch(logout())}
                      className="text-left text-red-400 mt-6 cursor-pointer"
                  >
                      Logout
                  </button>
              </nav>
          </aside>
          <main className="flex-1 bg-gray-100 p-6">
              <Outlet />
          </main>
    </div>
  )
}

export default AdminLayout