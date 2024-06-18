import { Outlet } from 'react-router-dom'

const DashboardRouter = () => {
  return (
    <div style={{width: "100%"}}>
        <Outlet />
    </div>
  )
}

export default DashboardRouter