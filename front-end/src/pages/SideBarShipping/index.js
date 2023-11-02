import React from 'react';
import { useNavigate } from "react-router";
import '../SideBarShipping/SideBarShipping.scss'
const SideBarShipping = () => {
    const navigate = useNavigate()
    return (
        <div className='sidebarShipping'>
            <div className="action">
                <div className="shipping" onClick={() => navigate('/shipper')}>
                    <span>Shipping</span>
                </div>
                <div className="chatShipping" onClick={() => navigate('/chatShipping')}>
                    <span>Chat</span>
                </div>
            </div>
        </div>

    );
};

export default SideBarShipping;