import "../OrderManager/OrderManager.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function OrderManager() {
    const [orderManage, setOrderManage] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const account = useSelector(state => state.account);
    useEffect(() => {
        axios
            .get(`/api/order/getAll`, {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                }
            })
            .then((res) => {
                setOrderManage(res.data.data);
            })
            .catch(err => console.log(err));

    }, []);

    const openProductModal = (products) => {
        setSelectedProduct(products);
        setOpenModal(true);
    };

    console.log(selectedProduct);
    return (
        <div className='categoryManager'>
            <div className="listCate">
                <div className="listCateHeader">
                    <input
                        type="text"
                        className="inputSearchCate"
                        placeholder="Search Order"
                    />
                </div>
                <div className="tableCate">
                    <div className="tableHeader">
                        <div className="nameHeader">
                            <span>Name</span>
                        </div>
                        <div className="phoneHeader">
                            <span>Phone</span>
                        </div>
                        <div className="addressHeader">
                            <span>Address</span>
                        </div>
                        <div className="productHeader">
                            <span>Product</span>
                        </div>
                        <div className="quantityHeader">
                            <span>Quantity</span>
                        </div>
                        <div className="quantityHeader">
                            <span>TotalPrice</span>
                        </div>
                        <div className="createdAt">
                            <span>Time</span>
                        </div>
                        <div className="createdAt">
                            <span>Status</span>
                        </div>

                    </div>
                    <div className="tableBody">
                        {orderManage.map((o, index) => (
                            <div className="rowBody" key={index}>
                                <div className="nameBody">
                                    <span>{o.addressShippingId.customerName}</span>
                                </div>
                                <div className="phoneBody">
                                    <span>{o.addressShippingId.phone}</span>
                                </div>
                                <div className="addressBody">
                                    <span>{o.addressShippingId.address}</span>
                                </div>
                                <div className="productBody">
                                    <div className="representativeImage">
                                        <img src={o.cart[0].image} alt="" />
                                        <div className="middle">
                                            <div className="text" onClick={() => openProductModal(o.cart)}>
                                                View
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="quantityBody">
                                    <span>{o.cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                </div>
                                <div className="quantityBody">
                                    <span>{o.totalPrice.toLocaleString('en-US')} vnd</span>
                                </div>
                                <div className="createAtBody">
                                    <span>{new Date(o.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedProduct && (
                        <div className="modalBackground">
                            <div className={`modalContainer${openModal ? " show" : ""}`}>
                                <div className="titleCloseBtn">
                                    <button
                                        onClick={() => {
                                            setOpenModal(false);
                                            setSelectedProduct(null);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="title">
                                    <h1>Detail</h1>
                                </div>
                                <div className="body">
                                    <div className="tableProduct">
                                        <div className="tableProductHeader">
                                            <div className="IdProduct">
                                                <span>STT</span>
                                            </div>
                                            <div className="imgProduct">
                                                <span>Image</span>
                                            </div>
                                            <div className="nameProduct">
                                                <span>Name</span>
                                            </div>
                                            <div className="quantityProduct">
                                                <span>Quantity</span>
                                            </div>
                                            <div className="priceProduct">
                                                <span>Price</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tableBodyProduct">
                                        {selectedProduct.map((product, index) => (
                                            <div className="rowBodyProduct" key={index}>
                                                <div className="productId">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="productImg">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                                <div className="productName">
                                                    <span>{product.name}</span>
                                                </div>
                                                <div className="productQuantity">
                                                    <span>{product.quantity}</span>
                                                </div>
                                                <div className="productPrice">
                                                    <span>{product.totalPrice.toLocaleString('en-US')} vnd</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderManager;