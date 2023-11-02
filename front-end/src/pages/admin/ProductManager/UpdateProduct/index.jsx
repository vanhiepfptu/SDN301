import './UpdateProduct.scss'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import Loading from '../../../Loading'
import { faHandsAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons'


function UpdateProduct(){

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [quantity, setQuantity] = useState()
    const [showImg, setShowImg] = useState()
    const [typeSubcategory, setTypeSubcategory] = useState('')
    const [subcategory, setSubcategory] = useState([])
    const [loadingUpload, setLoadingUpload] = useState(true)

    const account = useSelector(state => state.account)
    const { slug } = useParams()


    useEffect(() =>{

        axios
        .get(`/api/product/${slug}`)
        .then(res => {
            const data = res.data.data
            setName(data?.name)
            setPrice(data?.price)
            setImg(data?.image)
            setQuantity(data?.quantity)
            axios
            .put(`/api/subCategory/getByCategoryId`, {
                categoryId: data.subCategoryId.categoryId._id
            })
            .then(res => {
                setSubcategory(res.data.data)
            })
            .catch(err => console.log(err + "can not get Subcategory"))
            setTypeSubcategory(data?.subCategoryId._id)
        })
        .catch(err => console.log(err + "Can not get product"))

        
    },[slug])



   
    
    useEffect(() => {

        // Clean up
        return () => {
           showImg && URL.revokeObjectURL(showImg.preview)
        }
    }, [showImg])

    const handleFileUpload = (e) => {
            setImg(e.target.files[0])
            const fileImg = e.target.files[0];

            fileImg.preview = URL.createObjectURL(fileImg)

            setShowImg(fileImg)
    }

    const navigate = useNavigate()

    const handleUpload = () =>{
        if(!name || !price || !typeSubcategory){
            toast.warning("An Information is blank!")
        }else {
            setLoadingUpload(false)
            const data = new FormData();
            data.append("file",img);
            data.append("upload_preset", "seafood");
            data.append("cloud_name", "dggciohw8");      
            
             fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                const newProduct = {
                    name: name, 
                    price: price, 
                    quantity: quantity,
                    image: data.url,
                    subCategoryId: typeSubcategory
                };
                
                axios
                .put(`/api/product/update/${slug}`,newProduct,{
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                })
                .then(res => {
                    toast.success(`Update Product ${name} successfully!`)
                    setName('')
                    setPrice()
                    setTypeSubcategory('')
                    setQuantity()
                    setImg()
                    setShowImg()
                    setLoadingUpload(true)
                    navigate("/admin/productsManager")
                })
                .catch(err => console.log(err + "Can not update new product"))


            })
             .catch(err => console.log(err + "Can not upload"))

        }

    }


    return (
        <div className="uploadPage">
           {loadingUpload  ?  <div className='uploadContain'>
                <h3 className="uploadTitle">Update Product</h3>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Name</label>
                        <input 
                            type="text" 
                            className='inputName' 
                            id='inputName' 
                            placeholder='Enter Food Name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Price</label>
                        <input 
                            type="number"  
                            className='inputPrice' 
                            id='inputPrice' 
                            placeholder='Enter Food Price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}/>
                    </div>
                     <div className="inputBox">
                        <label htmlFor='inputQuantity'>Quantity</label>
                        <input 
                            type="number"  
                            className='inputPrice' 
                            id='inputQuantity' 
                            placeholder='Enter Food Price'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}/>
                    </div>
                  
                    <div className="inputBox">
                        <label htmlFor='inputTypeSub'>Subcategory</label>
                        <select 
                            className='inputTypeSub' 
                            id='inputTypeSub' 
                            value={typeSubcategory}
                            onChange={e => setTypeSubcategory(e.target.value)}>
                            <option value="">Choose a category</option>
                            {subcategory?.map(e => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="">Image</label>
                        <input 
                            type="file"
                            className='inputImg'
                            onChange={handleFileUpload}/>
                    </div>
                    <div className="inputBox">
                        {showImg && (
                            <img src={showImg.preview} alt='' width={"100%"}/>
                        )}
                        
                    </div>
                    <div className="submitForm">
                        <button className='uploadBtn' onClick={handleUpload}>Upload</button>
                    </div>

                </div>

            </div> : <Loading/> }
       </div>
    )
}

export default UpdateProduct