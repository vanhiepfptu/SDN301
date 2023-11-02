import "./Loading.scss"
import React from "react";

function Loading(){
    return (
        <div className="loading_container">
        <div className="loader">
            <div style={{ borderColor: "white" }} className="inner one"></div>
            <div style={{ borderColor: "#f9004d" }} className="inner two"></div>
            <div className="inner three"></div>
        </div>
        </div>
    );
}

export default Loading