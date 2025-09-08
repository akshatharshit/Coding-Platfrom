import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://coding-platfrom.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

