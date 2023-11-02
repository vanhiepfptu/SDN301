import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginAccount, logout } from "../../actions/accountAction";
import Loading from "../Loading";
import "./Login.scss";
import jwt_decode from "jwt-decode";
import { connectToSocket, setAccessToken } from "../../services/SocketService";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [loadingPage, setLoadingPage] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoadingPage(false)
    const action = logout();
    dispatch(action);
    axios
      .post("/api/account/logout")
      .then((res) => {
        console.log(res.data);
        setLoadingPage(true)
      })
      .catch((err) => console.log(err));
  }, []);


  const handleLogin = (e) => {
    setIsLoading(false)
    const userLogin = {
      username: username.trim(),
      password: password.trim()
    }


    axios
      .post("/api/account/login", userLogin)
      .then((res) => {
        if (res.data.status === "OK") {
          setIsLoading(false)
          const account = jwt_decode(res.data.accessToken)

          const user = {
            username: username,
            accessToken: res.data.accessToken,
            role: account.roleId
          }
          // console.log(roleId + "acc")
          // console.log(roleId?.roleId + "role");
          const action = loginAccount(user);
          dispatch(action);
          // console.log(res.data.accessToken);
          toast.success("Login successfully");
          // setAccessToken(`Bearer ${res.data.accessToken}`);
          connectToSocket();
          setIsLoading(true)
          navigate("/");
        } else {
          toast.error("Username or Password is not correct!");
          setIsLoading(true)
        }
      })
      .catch((err) => toast(err));

  };

  return (
    (isLoading && loadingPage) ? <div className="container">
      <div className="loginContent">
        <div className="leftContent">
          <h1>Sign In</h1>
          <img
            src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg"
            alt=""
          />
          <h2>Privacy policy {"&"} Term of service</h2>
        </div>
        <div className="rightContent">
          <form>
            <div className="input">
              <label htmlFor="mail">Username: </label>
              <input
                placeholder="Enter Username "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="mail"
              />
            </div>
            <div className="input">
              <label htmlFor="password">Password:</label>
              <input
                placeholder="Password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
              />
            </div>
            <p
              style={{
                color: "#f9004d",
                textAlign: "left",
                fontSize: "12px",
                display: "none",
              }}
            >
              Incorrect Email or Password
            </p>
            <p
              style={{
                color: "#f9004d",
                textAlign: "left",
                fontSize: "12px",
                display: "none",
              }}
            >
              Account is Blocked
            </p>
            <div className="handle">
              <button className="signUpBtn" onClick={() => handleLogin()} >Login</button>
              <i className="remember" style={{ textAlign: "center" }}>
                Change Password
              </i>
              <i className="remember">Remember Password</i>
            </div>
          </form>
          <div className="register">
            <b>You don't have an account? </b>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Register
            </p>
          </div>
        </div>
      </div>
    </div> : <Loading />
  );
}

export default Login