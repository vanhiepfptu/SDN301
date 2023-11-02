
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router"
import "./SideBar.scss"

function SideBar(){
    const location = useLocation();
    const navigate = useNavigate();
    const account = useSelector(state => state.account)

    const containPath = (url, path) =>{
        let result = url.includes(path)
        console.log(result);
    }

    return (
        <div className="sideBar">
            <div className="logoSideBar">
                <h1>Hola<b>Food</b></h1>
            </div>
            <div className="listAction ">
                {account?.role === 1 &&
                 <div className="generalDashboard" onClick={() => {navigate("/admin/general")}}>
                    <span>General</span>
                </div>}
                {account?.role === 1 &&
                 <div className="customerManager"  onClick={() => {navigate("/admin/customerManager")}}>
                    <span>Customers</span>
                </div>}
                {account?.role === 2 &&
                <div className="orderManager" onClick={() => { navigate("/admin/OrderManager") }}>
                    <span>Orders</span>
                </div>}
                {account?.role === 2 &&
                    <div className="productManager" onClick={() => navigate("/admin/productsManager")}>
                    <span>Products</span>
                </div>}
                {account?.role === 2 &&
                    <div className="categoryManager" onClick={() => navigate("/admin/categoriesManager")}>
                    <span>Category</span>
                </div>}
                {account?.role === 2 &&
                <div className="addProduct" onClick={() => navigate("/admin/upload")} >
                    <span>Add Product</span>
                    {containPath(location.pathname, 'upload')}
                </div>}
                {account?.role === 2 &&
                <div className="chatStaff" onClick={() => navigate("/admin/chat")} >
                    <span>Chat</span>
                </div>}
            </div>
            <div className="backHome">
                <span className="back" onClick={() => navigate('/')}>Back to home</span>
            </div>
        </div>
    )
}

export default SideBar