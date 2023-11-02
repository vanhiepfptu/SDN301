import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loading from "../../Loading"
import "./ProductManager.scss"


function ProductManager(){
    const navigate = useNavigate()

    const [listProduct, setListProduct] = useState([])
    const [loadProduct, setLoadProduct] = useState(false)


    useEffect(() =>{
        axios
        .get('/api/product/getAll')
        .then(res => {
            setListProduct(res.data.data)
            setLoadProduct(true)
        })
    },[])

    const handleUpdate = (id) => {
        navigate(`/admin/updateProduct/${id}`)
    }

    return (
        <div className="productsManager">
            <h3 className="productsManagerTitle">Products Manager</h3>
            {loadProduct ?  <div className="listProducts">
                <div className="addProduct" onClick={() => navigate("/admin/upload")}>
                    <img className="defaultImg" src="https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg" alt="" />
                    <span>Add Product</span>
                </div>
                {listProduct?.map(product => {
                    return (
                        <div className="cardProduct" onClick={() => handleUpdate(product?._id)}>
                            <img className="productImg" src={product?.image} alt="" />
                            <span >{product?.name}</span>
                            <p className="productPrice">{product?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                    )
                })}
               
               
                
            </div>:<Loading/>}
        </div>
    )
}

export default ProductManager