import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardRouter = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default DashboardRouter