import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { decreaseItem, increaseItem, removeItem, resetItem } from "../../actions/cartAction";
import Loading from "../Loading";
import "./CartPage.scss"

function CartPage(){
    // const [voucher, setVoucher] = useState('')
    const [itemCover, setItemCover] = useState()
    const [quantityRemain, setQuantityRemain] = useState()
    const [total, setTotal] = useState(0)
    const [loadingAddCart, setLoadingAddCart] = useState(false)

    const cartList = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const account = useSelector(state => state.account)

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(() => {
        let totalPrice = 0;
        cartList.forEach(cart => {
            totalPrice += cart.price * cart.total;
        });
        setTotal(totalPrice)
    }, [cartList])

    const handleIncrease = (item) => {
        const newItem = item;
        axios
        .get(`/api/product/${item?._id}`)
        .then(res => {
            setQuantityRemain(res.data.data.quantity);
        }).catch(err => console.log(err))
        if(item?.quantity < quantityRemain){
            const action = increaseItem(newItem);
            dispatch(action);
            toast.success(`${item?.name} is increase 1 product!`)
        }else{
            toast.warning("Can not increase product!")
        }
    }

    const handleDecrease = (item) => {
        if(item.total > 1  ){
            const newItem = item;
            const action = decreaseItem(newItem);
            dispatch(action);
            toast.success(`${newItem?.name} is decrease 1 product!`)
        }else{
            toast.warning(`Can not decrease the quantity of ${item?.name}`)
        }
    }

    const deleteItem = (item) => {
        const newItem = item;
        setItemCover(newItem);
        const action = removeItem(newItem);
        dispatch(action);
        toast.success(`Delete ${newItem.name} successfully!`)
    }   

    const handleCoverItem = () => {
        
    }

    const handlePayment = () => {
        setLoadingAddCart(true)

        axios
        .put('/api/account/addCart',cartList,{
            headers:{
                Authorization: `Bearer ${account?.accessToken}`
            }
        })
        .then(res => {
            // const action = resetItem()
            // dispatch(action)
            toast.success("Add Cart successfully!")
            setLoadingAddCart(false)
            navigate("/payment")
        })
        .catch(err => console.log(err))

    }

    const price = 50000;
    return(
        <div className="cartPage">
            <h3 className="cartPageTitle">Shopping Cart</h3>
            <div className="overallCart">
                
               {cartList[0]?.name === undefined ? <span>The bag is blank</span>: <span>{cartList?.length} items in the bag</span>}    
            </div> 
            <div className="listItems">
                {cartList.map((cart, index) => {
                    return (
                        <div className="itemBox" key={index}>
                            <div className="leftBox">
                                <img 
                                    src={cart?.image} 
                                    alt="" 
                                    onClick={() => navigate(`/menu/foodDetail/${cart?._id}`)}
                                    style={{"cursor": "pointer"}} />
                                <div className="detailItem">
                                    <h4 className="itemTitle">{cart?.name}</h4>
                                    <p className="itemDescription">{cart?.description}</p>
                                    <label>{cart?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                                </div>
                            </div>
                            <div className="productTotalPrice">
                                <label>{cart?.totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                            </div>
                            <div className="totalItem">
                                 <div className="countItem">
                                     <button
                                        className="btnTotal"
                                        onClick={() => handleDecrease(cart)}
                                    >
                                        -
                                    </button>
                                    <span className="numberItem">{cart?.total}</span>
                                     <button
                                        className="btnTotal"
                                        onClick={() => handleIncrease(cart)}
                                    >
                                        +
                                    </button>
                                 </div>
                                <span className="deleteItem" onClick={() => deleteItem(cart)}>Delete</span>
                            </div>
                        </div>
                    )
                } )}
            </div>
           {loadingAddCart === false ?  <div className="bill">
                {/* <div className="voucher">
                    <p className="voucherQuestion">Have A Promo Code?</p>
                    <div className="submitVoucher">
                        <input 
                            type="text" 
                            // value={voucher}
                            // onChange={(e) => setVoucher(e.target.value)}
                            className="inputVoucher"
                        />
                        <button className="sendVoucher">Submit</button>
                    </div>
                </div> */}
                <div className="totalPrice">
                    <div className="subtotal">
                        <div className="leftSub">
                            <span className="subtotalTitle">Subtotal: </span>
                        </div>
                        <div className="rightSub">
                            <p className="subtotalPrice"> {total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="discount">
                        <div className="leftDis">
                            <span className="discountTitle">Discount: </span>
                        </div>
                        <div className="rightDis">
                            <p className="discountNumber">{(price-50000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                    <div className="total">
                        <div className="leftTotal">
                            <span className="totalTitle">Total: </span>
                        </div>
                        <div className="rightTotal">
                            <p className="totalPrice">{total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    </div>
                   {cartList[0]?.name !== undefined ? <div className="paying">
                        <button onClick={() => handlePayment()}>Paying</button>
                    </div>:''}
                </div>
            </div>: <Loading/>}
        </div>
    )
}

export default CartPage