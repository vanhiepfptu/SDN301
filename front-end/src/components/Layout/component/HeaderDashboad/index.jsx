import { useSelector } from "react-redux"
import "./HeaderDashboard.scss"

function HeaderDashboard(){

    const account = useSelector(state => state.account)

    return (
        <div className="headerDashboard">
            <div className="inforManager">
                <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="" />
                <span className="nameManager">{account?.username}</span>
            </div>
        </div>
    )

}

export default HeaderDashboard