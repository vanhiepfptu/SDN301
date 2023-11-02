
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { resetItem } from '../../actions/cartAction';
import './Payment.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Loading from '../Loading';


function Payment() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartList = useSelector(state => state.cart)
    const account = useSelector(state => state.account)

    const [totalPrice, setTotalPrice] = useState(0)
    const [customerName, setCustomerName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [loadingConfirm, setLoadingConfirm] = useState(true)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        let total = 0;
        cartList?.forEach((item) => {
            total += item?.price * item?.total;
        })
        setTotalPrice(total)
    }, [cartList])

    const confirmOrder = () => {
        setLoadingConfirm(false)
        const paymentDetail = {
            customerName: customerName,
            customerPhone: +phoneNumber,
            customerAddress: address
        }

        axios
            .post("/api/order/create", paymentDetail, {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                }
            })
            .then(res => {
                toast.success("Create Order Successfully!")
                const action = resetItem();
                dispatch(action);
                setShowModal(false)
                setLoadingConfirm(true)
                navigate('/menu')
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    const handlePayment = () => {
        if (!customerName || !address || !phoneNumber) {
            toast.warning("Have information blank!")
        } else {
            setShowModal(true)
        }
    }

    return (
        <div className="paymentContent">
            <div className="leftPayment">
                <h2>Order Detail</h2>
                <div className="paymentInput">
                    <label>
                        Customer Name: <span style={{ color: "#f9004d" }}>*</span>
                    </label>
                    <input
                        value={customerName}
                        onChange={(e) => {
                            setCustomerName(e.target.value)
                        }}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="paymentInput">
                    <label>
                        Address: <span style={{ color: "#f9004d" }}>*</span>
                    </label>
                    <input
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                        placeholder="Enter your address"
                    />
                </div>

                <div className="paymentInput">
                    <label>
                        Phone Number: <span style={{ color: "#f9004d" }}>*</span>
                    </label>
                    <input
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                        }}
                        placeholder="Enter your phone number"
                    />
                </div>
                <button className='backToCart' onClick={() => navigate("/cart")}>Back to Cart</button>
            </div>

            <div className="rightPayment">
                <h2 style={{ "color": "#ff511c" }}>YOUR ORDER</h2>
                {loadingConfirm === true ? <div className="paymentDetail">
                    <div className="titleDetail">
                        <label>PRODUCT</label>
                        <label>PRICE</label>
                    </div>
                    <hr />
                    <div className="paymentPrice">
                        {cartList.map((cart, index) => {
                            return (
                                <div className="detailPrice" key={index}>
                                    <h5>
                                        {cart.name} x {cart.total}
                                    </h5>
                                    <span style={{ textAlign: "right" }}>
                                        {cart.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        VNĐ
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                    <div className="totalPrice">
                        <h5>SUBTOTAL</h5>
                        <span>
                            {totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </span>
                    </div>
                    <hr />
                    <div className="totalPrice">
                        <h5>Shipping</h5>
                        <span style={{ color: "#ccc" }}>{(totalPrice - totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <hr />
                    <div className="totalPrice">
                        <h5>Total</h5>
                        <span>
                            {(totalPrice).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </span>
                    </div>
                    <hr />

                    <div className="confirmPayment">
                        <button onClick={() => handlePayment()}>ĐẶT HÀNG</button>
                    </div>
                </div> : <Loading />}
            </div>
            {showModal ? <section className='popUp'>
                <span className="overlay"></span>

                <div className="modal-box">
                    <CheckCircleOutlineIcon className='checkIcon' />
                    <h2>Confirm Order</h2>
                    <h3>Are you sure to create order?</h3>
                    <div className="buttons">

                        <button className="close-btn" onClick={() => setShowModal(false)}>Later</button>
                        <button className="open-btn" onClick={() => confirmOrder()}>Confirm</button>
                    </div>
                </div>
            </section> : ''}
        </div>
    )

}

export default Payment