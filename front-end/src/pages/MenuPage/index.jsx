import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addToCart } from "../../actions/cartAction";
import Loading from "../Loading";
import "./MenuPage.scss"

function MenuPage(){
    const [search, setSearch] = useState('')
    const [optionDisplay, setOptionDisplay] = useState('')
    const [optionDisplay1, setOptionDisplay1] = useState('')
    const [category, setCategory] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const [listProducts, setListProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const account = useSelector(state => state.account)
    const navigate = useNavigate()
    const dispatch = useDispatch()


     useEffect(() =>{
        window.scrollTo(0,0)

         axios
        .get('/api/category/getAll')
        .then((res) =>{
            setCategory(res.data.data)
            setLoading(true)
        })
        .catch(err => console.log(err))
    
        axios
        .get('/api/product/getAll')
        .then(res => {
            setListProducts(res.data.data)
            setLoading(true)
            // console.log(res.data.data);
        })
        .catch(err => console.log(err))

    },[])

    useEffect(() =>{
        setLoading(false);
        if(optionDisplay===''){
            axios
            .get('/api/product/getAll')
            .then(res => {
                setListProducts(res.data.data)
                setLoading(true)
            })
            .catch(err => console.log(err))
            setOptionDisplay1('')
            setSearch('')
        }else{
            const categoryId = { categoryId: optionDisplay}
            axios
            .put('/api/product/getByCategoryId',categoryId)
            .then(res => {
                setListProducts(res.data.data)
                setLoading(true)
                // console.log(res.data.data);
            })
            .catch(err => console.log(err))

            axios
            .put('/api/subCategory/getByCategoryId', categoryId)
            .then((res) =>{
                setSubcategory(res.data.data)
                setLoading(true)
            })
            .catch(err => console.log(err))

        }
    }, [optionDisplay])

    useEffect(() => {
        setLoading(false);
        if(optionDisplay1 !== ''){
            const categoryId1 = { subCategoryId: optionDisplay1}
            axios
            .put('/api/product/getBySubcategoryId',categoryId1)
            .then(res => {
                setListProducts(res.data.data)
                setLoading(true)
            })
            .catch(err => console.log(err))
        }else{
            const categoryId = { categoryId: optionDisplay}
            axios
            .put('/api/product/getByCategoryId',categoryId)
            .then(res => {
                setListProducts(res.data.data)
                setLoading(true)
                // console.log(res.data.data);
            })
            .catch(err => console.log(err))
        }
    },[optionDisplay1])

    useEffect(() =>{
        setLoading(false);
        if(search===''){
            if(optionDisplay !== ''){
                if(optionDisplay1 !== ''){
                    const categoryId1 = { subCategoryId: optionDisplay1}
                    axios
                    .put('/api/product/getBySubcategoryId',categoryId1)
                    .then(res => {
                        setListProducts(res.data.data)
                        setLoading(true)
                    })
                    .catch(err => console.log(err))
                }else{
                    const categoryId = { categoryId: optionDisplay}
                    axios
                    .put('/api/product/getByCategoryId',categoryId)
                    .then(res => {
                        setListProducts(res.data.data)
                        setLoading(true)
                        // console.log(res.data.data);
                    })
                    .catch(err => console.log(err))
                }
            }else{
                axios
                .get('/api/product/getAll')
                .then(res => {
                    setListProducts(res.data.data)
                    setLoading(true)
                })
                .catch(err => console.log(err))
            }
        }else{
            if(optionDisplay!==''){
                const cate = {
                    categoryId: optionDisplay
                }
                axios
                .put('/api/product/getByCategoryId',cate)
                .then(res => {
                    const listProduct = res.data.data; 
                    const newList = listProduct.filter(product => {
                        return product?.name.includes(search)
                    })
                    setListProducts(newList)
                    setLoading(true)
                })
                // console.log(newList);
            }else{
                axios
                .get(`/api/product/getAll?page=3&limit=10`)
                .then(res => {
                    const listProduct = res.data.data;
                    var newListProduct = listProduct.filter(product => {
                        return product?.name.includes(search)
                    })
                    setListProducts(newListProduct)
                    setLoading(true)
                })
                .catch(err => console.log(err))
            }
        }
    },[search])

    const handleAddtoCart = (item) => {
       if(account.username === undefined ){
            toast.warning("Please login to add to card!")
       }else if(item?.quantity <= 0){
            toast.warning(`${item?.name} is sold out!`)
       }else{
            const newItem = item;
            const action = addToCart(newItem);
            dispatch(action);
            toast.success(`Add ${item?.name} successfully`);
       }
        
    }

    return (
        <div className="menuPage">
                        
            <div className="menuHeader">
                <div className="optionDisplay">
                    <select
                        className="option"
                        value={optionDisplay}
                        onChange={e => setOptionDisplay(e.target.value)}
                    >
                        <option value="">All Products</option>
                       {loading ? category?.map((e) => {
                            return <option value={e?._id} key={e?._id}>{e?.name}</option>
                        } ): <Loading/>}
                    </select>
                    <select
                        className="option"
                        value={optionDisplay1}
                        onChange={e => setOptionDisplay1(e.target.value)}
                        style={optionDisplay === '' ?{'display':"none"}:{'display':"inline-block"}}
                    >
                        <option value="">Choose A Subcategory</option>
                       {loading ?subcategory?.map((e) => {
                            return <option value={e?._id} key={e?._id}>{e?.name}</option>
                        } ):<Loading/>}
                    </select>
                </div>
                <h2 className="menuTitle">HolaFood Menu</h2>
                <div className="menuSearch">
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="inputSearchMenu"
                        placeholder="Enter name"
                        />
                </div>
            </div>
            <div className="cardList">
                {loading ? listProducts?.map(e => {
                    return (
                    <div className="card" key={e?._id} >
                        <img src={e?.image} alt="" onClick={() => {navigate(`/menu/foodDetail/${e?._id}`)}}/>
                        <span className="foodName">{e?.name}</span>
                        <p className="foodPrice">{e?.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
                       {e?.quantity<=0? <button className="addBtn" style={{backgroundColor: "red", pointerEvents: "none", borderRadius: 0}}>Sold Out</button>: <button className="addBtn" onClick={() => handleAddtoCart(e)}>Add</button>}
                    </div>)
                }): <Loading/>}

                
            </div>

        </div>
    )
}

export default MenuPage