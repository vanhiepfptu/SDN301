import React from "react";
import { useNavigate } from "react-router";
import "./style.scss"

const Footer = () => {
  const navigate = useNavigate()

  return(
   <div className="footer">
      <hr/>
      <div className="topFooter">
        <div className="logoFooter">
              <h1 onClick={() => navigate("/")}>Hola<b>Food</b></h1>
        </div>
        <div className="company">
            <h3 className="companyTitle">The Company</h3>
            <ul>
              <li>The Story</li>
              <li>The App</li>
              <li>Recruiment</li>
            </ul>
        </div>
        <div className="services">
            <h3 className="servicesTitle">Services</h3>
            <ul>
              <li>Tracking order</li>
              <li>Vip room order</li>
              <li>Store Location</li>
              <li>FAQ</li>
            </ul>
        </div>
        <div className="termPolicy">
            <h3 className="termPolicy">Terms {'&'} Policy</h3>
            <ul>
              <li>Product return</li>
              <li>Return Policy</li>
              <li>Payment Policy</li>
              <li>Privacy Policy</li>
              <li>Terms of Transaction</li>
              <li>VIP Customer Policy</li>
            </ul>
        </div>
        <div className="contact">
            <h3 className="contactTitle">Contact Us</h3>
            <ul>
              <li></li>
              <li>Office: FPT University</li>
              <li>Tel: 0888.637.937</li>
              <li>Email: holafood@gmail.com</li>
            </ul>
        </div>
        <div className="tracking">
            <h3 className="trackingTitle">Tracking Your Order</h3>
            <p className="enterMail">Enter your email,order code or phone numbers to find your oders</p>
            <div className="handleMail">
                <input type="text" placeholder="Order code" className="orderCode" />
                <button className="trackingBtn">TRACKING</button>

            </div>
        </div>
      </div>
    <hr/>
      <div className="copyRight">
          <span className="copyRightContent">Copyright ©2023 HolaFood All Rights Reserved.</span>
      </div>
  </div>
  )
};

export default Footer;
