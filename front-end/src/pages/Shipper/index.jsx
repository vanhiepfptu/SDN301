import React, { useEffect, useState } from 'react';
import './Shipper.scss'; // Import CSS file
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import SideBarShipping from '../SideBarShipping';

const ShipperTable = () => {
  const [orderList, setOdrerList] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("Start Receive Order");
  const [cancelReason, setCancelReason] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectOrder, setSelectOrder] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const account = useSelector(state => state.account);

  useEffect(() => {
    axios
      .get(`/api/shipping/getAllOrder`, {
        headers: {
          Authorization: `Bearer ${account?.accessToken}`
        }
      })
      .then((res) => {
        setOdrerList(res.data.data);
      })
      .catch(err => console.log(err));

  }, [account]);

  useEffect(() => {
    const filteredResults = orderList.filter((o) => {
      return o.addressShippingId.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredResults);
  }, [searchTerm, orderList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const openProductModal = (products) => {
    setSelectedProduct(products);
    setOpenModal(true);
  };

  const openChangeStatusModal = () => {
    setOpenChangeStatus(true);
  };

  const handleSubmitStatus = () => {
    if (selectOrder && selectOrder._id) {
      if (account?.role === 3) {
        let apiUrl;
        let updatedReasonCancel = "";
        if (selectedStatus === "Start Receive Order") {
          apiUrl = `/api/shipping/startReceiveOrder`;
          updatedReasonCancel = "";
        } else if (selectedStatus === "Success Delivery Order") {
          apiUrl = `/api/shipping/successDeliveryOrder`;
          updatedReasonCancel = "";
        } else if (selectedStatus === "Failed Delivery Order") {
          apiUrl = `/api/shipping/failedDeliveryOrder`;
          updatedReasonCancel = cancelReason;
        }

        console.log(selectOrder);
        console.log(selectedStatus);
        const requestData = {
          orderId: selectOrder._id,
          message: updatedReasonCancel, // Cập nhật reasonCancel dựa trên trạng thái mới
        };
        axios
          .put(apiUrl, requestData, {
            headers: {
              Authorization: `Bearer ${account?.accessToken}`,
            },
          })
          .then((res) => {
            setOdrerList(prevOrderList => {
              const updatedOrderList = prevOrderList.map(order => {
                if (order._id === selectOrder._id) {
                  return {
                    ...order,
                    isDelivery: selectedStatus === "Start Receive Order",
                    isDeliverySuccess: selectedStatus === "Success Delivery Order",
                    isCancel: selectedStatus === "Failed Delivery Order",
                    reasonCancel: selectedStatus === "Failed Delivery Order" ? cancelReason : order.reasonCancel,
                  };
                }
                return order;
              });
              return updatedOrderList;
            });
            setOpenChangeStatus(false);
          })
          .catch((err) => {
            console.error("API Response (Error):", err);
            console.error("Error updating order status", err);
          });
      } else {
        console.log("Bạn không có quyền thay đổi trạng thái đơn hàng.");
      }
    } else {
      console.log("Vui lòng chọn một đơn hàng để thay đổi trạng thái.");
    }
  };

  return (
    <div className="container-fluid shipper-container">
      <div>
        <SideBarShipping />
      </div>
      {/* Table */}
      <div className="table-container">
        {/* Search Bar */}
        <div className='Search'>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Table */}
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
              <span>Total Price</span>
            </div>
            <div className="createdAt">
              <span>Status</span>
            </div>
            <div className="createdAt">
              <span>Reason Cancel</span>
            </div>
            <div className="createdAt">
              <span>Action</span>
            </div>
          </div>
          <div className="tableBody">
            {(searchResults.length > 0 ? searchResults : orderList).map((o) => (
              <div className="rowBody" key={o._id}>
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
                <div className="priceBody">
                  <span>{o.totalPrice.toLocaleString('en-US')} vnd</span>
                </div>
                <div className="statusBody">
                  <span>{o.isDeliverySuccess ? "Delivered" : (o.isCancel ? "Cancelled" : (o.isDelivery ? "In Progress" : " "))}</span>
                </div>
                <div className="reasonBody">
                  <span>{o.reasonCancel}</span>
                </div>
                <div className="actionBody">
                  <button onClick={() => {
                    openChangeStatusModal(true)
                    setSelectOrder(o);
                  }}>Change</button>
                </div>
              </div>
            ))}
          </div>

          {openChangeStatus && (
            <div className="modalStatusBackground">
              <div className={`modalContainer${openChangeStatus ? " show" : ""}`}>
                <div className="titleCloseBtn">
                  <button
                    onClick={() => {
                      setOpenChangeStatus(false);
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="title">
                  <h1>Change status</h1>
                </div>
                <div className="body">
                  <select
                    className="status"
                    id="status"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Start Receive Order">Start Receive Order</option>
                    <option value="Success Delivery Order">Success Delivery Order</option>
                    <option value="Failed Delivery Order">Failed Delivery Order</option>
                  </select>
                  {selectedStatus === "Failed Delivery Order" && (
                    <textarea
                      className="reason"
                      type="text"
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                  )}
                </div>
                <div className="footer">
                  <button
                    onClick={() => {
                      setOpenChangeStatus(false);
                    }}
                    id="cancelBtn"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitStatus}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

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
  );
};

export default ShipperTable;
