import HeaderDashboard from "../component/HeaderDashboad";
import SideBar from "../component/SideBar";
import "./Dashboard.scss"

function Dashboard({children}){
    return (
        <div className="wrapperDashboard">
            <div className="sideBarContain">
                <SideBar/>
            </div>
            <div className="dashboard">
                <HeaderDashboard/>
                {children}
            </div>
        </div>
    )
}

export default Dashboard