import AxiosService from "./AxiosService";

const axios = new AxiosService();

let UserURL = 'https://localhost:44388/api/User';
let NoteURL = 'https://localhost:44388/api/Note';

const header = {
    header : {
        token : localStorage.getItem("token")
    }
}

class UserService {
    SignUp(data){
        return axios.post(`${UserURL}/Register`,data);
    }

    SignIn(data){
        return axios.post(`${UserURL}/Login`,data)
    }

    ForgetPassword(data){
        return axios.post(`${UserURL}/ForgetPassword`,data)
    }

    ResetPassword(data){
        return axios.put(`${UserURL}/ResetPassword`,data, header)
    }

    TakeNote(data){
        return axios.post(`${NoteURL}/AddNote`, data)
    }
}

export default UserService;