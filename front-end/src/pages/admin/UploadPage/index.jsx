import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Loading from '../../Loading'
import './UploadPage.scss'

function UploadPage() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [img, setImg] = useState('')
    const [showImg, setShowImg] = useState()
    const [typeSubcategory, setTypeSubcategory] = useState('')
    const [inventories, setInventories] = useState()
    const [quantity, setQuantity] = useState()
    const [category, setCategory] = useState([])
    const [subcategory, setSubcategory] = useState([])
    const [loadingUpload, setLoadingUpload] = useState(true)
    const [selectInventory, setSelectInventory] = useState('')
    const [description, setDescription] = useState('')
    const [isTrueFile, setIsTrueFile] = useState(false)

    const account = useSelector(state => state.account)

    useEffect(() => {
        axios
            .get('/api/category/getAll')
            .then((res) => {
                setCategory(res.data.data)
            })
            .catch(err => console.log(err))


        axios
            .get('/api/inventory/getAll', {
                headers: {
                    Authorization: `Bearer ${account?.accessToken}`
                }
            })
            .then((res) => {
                setInventories(res.data.data)
                console.log(res.data.data + "11");
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        axios
            .put('/api/subCategory/getByCategoryId', {
                categoryId: type
            })
            .then(res => {
                setSubcategory(res.data.data)
            })
            .catch(err => console.log(err + "Can not get subcategory"))

    }, [type])

    useEffect(() => {

        // Clean up
        return () => {
            showImg && URL.revokeObjectURL(showImg.preview)
        }
    }, [showImg])

    const handleFileUpload = (e) => {
        setImg(e.target.files[0])
        const fileImg = e.target.files[0];

        if(fileImg.type === 'image/jpeg' || fileImg.type === 'image/png'){
            fileImg.preview = URL.createObjectURL(fileImg)
            toast.success("Upload image successfully!")
            setIsTrueFile(true)
            setShowImg(fileImg)
        }else{
            setIsTrueFile(false)
            toast.error("File is not a image!")
        }

       
    }

    const navigate = useNavigate()

    const handleUpload = () => {
        if (!name || !price || !type || !typeSubcategory) {
            toast.warning("An Information is blank!")
        } else if(!isTrueFile){
            toast.warning("File is not a Image!")
        }else{
            setLoadingUpload(false)
            const data = new FormData();
            data.append("file", img);
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
                        description: description,
                        subCategoryId: typeSubcategory,
                        inventoryId: selectInventory
                    };

                    axios
                        .post('/api/product/create', newProduct, {
                            headers: {
                                Authorization: `Bearer ${account?.accessToken}`
                            }
                        })
                        .then(res => {
                            toast.success(`Upload Product ${name} successfully!`)
                            setName('')
                            setPrice()
                            setType('')
                            setTypeSubcategory()
                            setImg()
                            setShowImg()
                            setDescription('')
                            setSelectInventory()
                            setLoadingUpload(true)
                            setQuantity()
                            setIsTrueFile(false)
                        })
                        .catch(err => console.log(err + "Can not upload new product"))


                })
                .catch(err => console.log(err + "Can not upload"))

        }

    }

    return (
        <div className="uploadPage">
            {loadingUpload ? <div className='uploadContain'>
                <h3 className="uploadTitle">Upload Product</h3>
                <div className="uploadContent">
                    <div className="inputBox">
                        <label htmlFor='inputName'>Name</label>
                        <input
                            type="text"
                            className='inputName'
                            id='inputName'
                            placeholder='Enter Food Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputPrice'>Price</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputPrice'
                            placeholder='Enter Food Price'
                            value={price}
                            onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='description'>Description</label>
                        <textarea
                            className='inputPrice'
                            id='description'
                            placeholder='Enter Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputQuantity'>Quantity</label>
                        <input
                            type="number"
                            className='inputPrice'
                            id='inputQuantity'
                            placeholder='Enter Quantity'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor='inputType'>Category</label>
                        <select
                            className='inputType'
                            id='inputType'
                            value={type}
                            onChange={e => setType(e.target.value)}>

                            <option value="">Choose a category</option>
                            {category?.map((e) => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            })}
                        </select>
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
                        <label htmlFor='inputInven'>Inventory</label>
                        <select
                            className='inputTypeSub'
                            id='inputInven'
                            value={selectInventory}
                            onChange={e => setSelectInventory(e.target.value)}>
                            <option value="">Choose a category</option>
                            {inventories?.map(e => {
                                return <option value={e?._id} key={e?._id}>{e?.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="">Image</label>
                        <input
                            type="file"
                            className='inputImg'
                            onChange={handleFileUpload} />
                    </div>
                    <div className="inputBox">
                        {showImg && (
                            <img src={showImg.preview} alt='' width={"100%"} />
                        )}
                    </div>
                    <div className="submitForm">
                        <button className='uploadBtn' onClick={handleUpload}>Upload</button>
                    </div>

                </div>

            </div> : <Loading />}
        </div>
    )
}

export default UploadPage