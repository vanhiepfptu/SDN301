import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Loading from "../Loading"
import "./SignUp.scss"

function SignUp(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const handleSignUp= () => {
      if(!username || !password || !confirmPassword){
        toast.warning("Have a blank information")
      }else if(password !== confirmPassword){
          toast.warning("Password is not match Confirm Password")
      }else{
        setIsLoading(false)
        const userRegister = {
          username: username,
          password: password,
          confirmPassword: confirmPassword
        }
        axios
        .post("/api/account/register",userRegister)
        .then((res) => {
          // console.log(res.data);
          if(res.data.status === "ERR"){
            toast.error("Username already exists!")
            setIsLoading(true)
          }else{
            toast.success("Create account successfully")
            setIsLoading(true)
            navigate("/login")
          }
        })
        .catch(err => toast(err))
      }
    }

    return (
       isLoading ? <div className="container">
          <div className="loginContent">
            <div className="leftContent">
              <h1>Sign Up</h1>
              <img src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg" alt="" />
              <h2>Privacy policy {"&"} Term of service</h2>
            </div>
            <div className="rightContent">
              <div className="input">
                <label htmlFor="mail">Username: </label>
                <input
                  placeholder="Enter Username "
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  id="mail"
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password:</label>
                <input
                  placeholder="Password"
                  type={"password"}
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  placeholder="Confirm Password"
                  type={"password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* <div className="input">
                <label htmlFor="displayName">Display Name: </label>
                <input
                  placeholder="Enter Display Name"
                  id="displayName"
                />
              </div> */}
              <div className="handle">
                <button onClick={() =>  {navigate("/login")}}>Back to Log In</button>
                <button onClick={() => {handleSignUp()}}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>:<Loading/>
    )
}

export default SignUp