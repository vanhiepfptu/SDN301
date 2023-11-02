import axios from "axios"
const ROOT_URL = process.env.REACT_APP_API_URL_BACKEND
export const loginUser = async (data) => {
    const res = await axios.post(`${ROOT_URL}/user/sign-in`, data)
    return res.data
}