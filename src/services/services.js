import axios from "axios";

// import authHeader from "./auth-header";
const API_URL = "http://localhost:7070";

class UserService {

    static async getAllNinsRecord() {
        return await axios.get(API_URL + '/api/nin-records/', );
    }

    static async handleCreateUser(data) {
        return await axios.post(API_URL + '/api/create-user/', data, );
    }

    static async handleCreateNinRecord(data) {
        return await axios.post(API_URL + '/api/add-record/', data, );
    }
    
}
export default UserService;
