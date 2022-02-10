import AxiosService from "./AxiosService";

const axios = new AxiosService();

let baseURL = 'https://localhost:44388/api/User';

const header = {
    header : {
        token : localStorage.getItem("token")
    }
}

class UserService {
    SignUp(data){
        return axios.post(`${baseURL}/Register`,data);
    }

    SignIn(data){
        return axios.post(`${baseURL}/login`,data)
    }

    ForgotPassword(data){
        return axios.post(`${baseURL}/forgetPassword`,data)
    }

    ResetPassword(data){
        return axios.put(`${baseURL}/resetPassword`,data, header)
    }
}

export default UserService;