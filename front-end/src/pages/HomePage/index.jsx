import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./style.scss"
import pizza from "../../assets/images/pizza.png"

const HomePage = () => {

  const navigate = useNavigate()
   useEffect(() =>{
    window.scrollTo(0,0)
  },[])

  return (<React.Fragment>
    <div className="content">
      <div className="content-left">
        <div className="info">
          <h2>Order Your Best <br/>Food anytime</h2>
          <p>Hey, Our delicious food is waiting for you, <br/>
            We are always near to you with fresh item of food</p>
        </div>
        <button onClick={() => navigate("/menu")}>Explore Food</button>
      </div>
      <div className="content-right">
        <img src={pizza} alt="" />
      </div>
    </div>

  </React.Fragment>);
};

export default HomePage;
