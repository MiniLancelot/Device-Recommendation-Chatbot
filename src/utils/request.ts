import axios from "axios"

const createAxiosInstance = () => {
    return axios.create({
        baseURL: `https://hsr-api.vercel.app/api/v1`,
        headers: {
            "Content-Type": "application/json",
            "Allow-Origin": "*",
            "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true
    })
}

export default createAxiosInstance