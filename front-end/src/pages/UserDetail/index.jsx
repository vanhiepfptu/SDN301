import React, { useEffect, useState } from 'react';
import "./UserDetail.scss"
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const UserDetail = () => {
    const [userDetail, setUserDetail] = useState()
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState()
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newDob, setNewDob] = useState('')
    const [newGender, setNewGender] = useState(true)
    const [editImage, setEditImage] = useState()
    const [updateData, setUpdateData] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const account = useSelector(state => state.account)
    useEffect(() => {
        if (!userDetail) {
            axios
                .get(`api/user/getDetail`, {
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                })
                .then(res => {
                    const userData = res.data.data
                    setUserDetail(userData)
                    console.log(res.data.data)
                })
                .catch(error => {
                    console.error(error)
                });
        }
    }, [userDetail, account])

    const handleFileUpload = (e) => {
        setImage(e.target.files[0])

        const fileImg = e.target.files[0];

        fileImg.preview = URL.createObjectURL(fileImg)

    }

    const handleEditFileUpload = (e) => {
        setEditImage(e.target.files[0])

        const fileImg = e.target.files[0]

        fileImg.preview = URL.createObjectURL(fileImg)
        setUpdateData({ ...updateData, image: e.target.files[0] })
    }


    const handleSaveChanges = () => {
        const user = {
            email: email,
            phone: phone,
            dateOfBirth: dob,
            gender: gender,
        }
        if (!editImage) {
            axios
                .put(`/api/user/update/`, updateData, {
                    headers: {
                        Authorization: `Bearer ${account?.accessToken}`
                    }
                })
                .then(res => {
                    setUserDetail({ ...userDetail, ...updateData })
                    setIsEditing(false)
                    toast.success('Saved changes successfully!!!!!!!')
                })
                .catch(error => {
                    console.error(error)
                });
        } else {
            const data = new FormData()
            data.append("file", editImage)
            data.append("upload_preset", "seafood")
            data.append("cloud_name", "dggciohw8")

            fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((cloudinaryData) => {

                    updateData.image = cloudinaryData.url;
                    axios
                        .put(`/api/user/update/`, updateData, {
                            headers: {
                                Authorization: `Bearer ${account?.accessToken}`
                            }
                        })
                        .then(res => {
                            setUserDetail({ ...userDetail, ...updateData })
                            setIsEditing(false)
                            toast.success('Saved changes successfully!!!!!!!')
                        })
                        .catch(error => {
                            console.error(error)
                        });
                })
        }
    }


    const convertISODateToYYYYMMDD = (isoDate) => {
        if (!isoDate) {
            return '';
        }

        const dateParts = isoDate.split('T')[0].split('-')
        if (dateParts.length === 3) {
            return dateParts[0] + '-' + dateParts[1] + '-' + dateParts[2]
        } else {
            return '';
        }
    }

    const formatISODate = (isoDate) => {
        if (!isoDate) {
            return '';
        }

        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

        return date.toLocaleString('en-US', options)
    }

    const displayError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
        });
    };

    console.log(updateData);
    return (
        <div>
            <div>
                <div className="userDetail">
                    <div className="row">
                        <div className="column1">
                            <div className="card">
                                <h2>Avatar</h2>
                                <hr className='line1' />
                                <div className="userImage">
                                    <img src={userDetail ? userDetail.image : ''} alt="" />
                                </div>
                                <h4>{userDetail && userDetail.createdAt ? formatISODate(userDetail.createdAt) : ''}</h4>
                                <h2>{account.username}</h2>
                            </div>

                        </div>
                        <div className="column2">
                            <div className="card">
                                <div className='head'>
                                    <h2>Information</h2>
                                    {(!userDetail || !userDetail.email) && (
                                        <button onClick={() => { setOpenModalDetail(true) }}>
                                            <AddIcon className='icon' />
                                        </button>
                                    )}
                                </div>

                                <hr className='line2' />
                                {openModalDetail && (
                                    <div className="modalBackground">
                                        <div className={`modalContainer${openModalDetail ? " show" : ""}`}>
                                            <div className="titleCloseBtn">
                                                <button
                                                    onClick={() => {
                                                        setOpenModalDetail(false);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <div className="title">
                                                <h1>Create Infomation</h1>
                                            </div>
                                            <div className="body">
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='registerEmail'
                                                        placeholder='Email'
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='registerEmail'
                                                        placeholder='Phone'
                                                        value={newPhone}
                                                        onChange={(e) => setNewPhone(e.target.value)}
                                                    />
                                                </div>
                                                <input
                                                    className="date"
                                                    type="date"
                                                    value={newDob}
                                                    onChange={(e) => setNewDob(e.target.value)}
                                                />
                                                <div className='registerGender'>
                                                    <div className='male'>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="true"
                                                            checked={newGender}
                                                            onChange={() => setNewGender(true)}
                                                        />
                                                        Male
                                                    </div>
                                                    <div className='female'>
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value="false"
                                                            checked={!newGender}
                                                            onChange={() => setNewGender(false)}
                                                        />
                                                        Female
                                                    </div>
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        onChange={handleFileUpload}
                                                    />
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <button
                                                    onClick={() => { setOpenModalDetail(false) }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                                                            displayError('Please enter a valid email address.');
                                                            return;
                                                        }

                                                        if (!newPhone || !/^\d{10}$/.test(newPhone)) {
                                                            displayError('Please enter a 10-digit phone number.');
                                                            return;
                                                        }

                                                        if (!newDob) {
                                                            displayError('Please enter a valid date of birth.');
                                                            return;
                                                        }
                                                        const data = new FormData();
                                                        data.append("file", image);
                                                        data.append("upload_preset", "seafood");
                                                        data.append("cloud_name", "dggciohw8");

                                                        fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
                                                            method: "post",
                                                            body: data,
                                                        })
                                                            .then((res) => res.json())
                                                            .then((cloudinaryData) => {
                                                                const newDetail = {
                                                                    email: newEmail,
                                                                    phone: newPhone,
                                                                    dateOfBirth: newDob,
                                                                    gender: newGender,
                                                                    image: cloudinaryData.url,
                                                                };

                                                                // Update the newData state with the new image URL
                                                                setUpdateData({ ...updateData, image: cloudinaryData.url });

                                                                axios
                                                                    .post('/api/user/register', newDetail, {
                                                                        headers: {
                                                                            Authorization: `Bearer ${account?.accessToken}`
                                                                        }
                                                                    })
                                                                    .then(res => {
                                                                        setImage()
                                                                        setUserDetail(res.data.data);
                                                                        console.log('User created successfully:', res.data);
                                                                        toast.success('Created information successfully!!!');
                                                                        setOpenModalDetail(false);
                                                                    })
                                                                    .catch(error => {
                                                                        console.error(error);
                                                                    });
                                                            })
                                                    }}
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='create'>
                                    <div className='emailDetail'>
                                        <label>Email: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={updateData.email || (userDetail ? userDetail.email : '')}
                                                onChange={e => setUpdateData({ ...updateData, email: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? userDetail.email : ''}</span>
                                        )}
                                    </div>
                                    <div className='phoneDetail'>
                                        <label>Phone: </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={updateData.phone || (userDetail ? userDetail.phone : '')}
                                                onChange={e => setUpdateData({ ...updateData, phone: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? userDetail.phone : ''}</span>
                                        )}
                                    </div>
                                    <div className='dobDetail'>
                                        <label>Date of Birth: </label>
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={updateData.dateOfBirth || (userDetail ? userDetail.dateOfBirth : '')}
                                                onChange={e => setUpdateData({ ...updateData, dateOfBirth: e.target.value })}
                                            />
                                        ) : (
                                            <span>{userDetail ? convertISODateToYYYYMMDD(userDetail.dateOfBirth) : ''}</span>
                                        )}
                                    </div>
                                    <div className='genderDetail'>
                                        <label>Gender: </label>
                                        {isEditing ? (
                                            <div>
                                                <label>
                                                    <input
                                                        id='male'
                                                        type="checkbox"
                                                        checked={updateData.gender}
                                                        onChange={() => setUpdateData({ ...updateData, gender: true })}
                                                    />
                                                    Male
                                                </label>
                                                <label>
                                                    <input
                                                        id='female'
                                                        type="checkbox"
                                                        checked={!updateData.gender}
                                                        onChange={() => setUpdateData({ ...updateData, gender: false })}
                                                    />
                                                    Female
                                                </label>
                                            </div>
                                        ) : (
                                            <span>{userDetail ? (userDetail.gender ? 'Male' : 'Female') : 'Male'}</span>
                                        )}
                                    </div>

                                    <div className='avatarUser'>
                                        {isEditing && (
                                            <>
                                                <label>Image URL:</label>
                                                <input
                                                    type="file"
                                                    onChange={handleEditFileUpload}
                                                />
                                            </>
                                        )}
                                    </div>
                                    {userDetail ? (
                                        isEditing ? (
                                            <button onClick={handleSaveChanges}>Save Change</button>
                                        ) : (
                                            <button onClick={() => setIsEditing(true)}>Edit</button>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;