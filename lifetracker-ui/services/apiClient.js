import axios from "axios";
import { API_BASE_URL } from "../constants"

class ApiClient{
    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }
    async setToken(){

    }
    async request({method, bodyData, subDirectory}){
        let response = undefined;
        await axios({
           method : method,
           data: bodyData, 
           url: API_BASE_URL + subDirectory
        })
        .then((axiosResponse) => {
            // updates response variable if call is successful
            response = {
                success: true,
                data: response.data,
                statusCode: axiosResponse.status
            }
        })
        .catch((axiosError) => {
            // update response variable with error if unsuccessful
            console.log(axiosError.response.status)
            response = {
                success: false,
                statusCode: axiosError.response.status
            }
        });

        return response;
    }
    async login(credentials){
        // const requestOptions = {
        //     method: "post",
        //     bodyData: credentials,
        //     subDirectory: "auth/login"
        // }
        // return await this.request(requestOptions);
    }
    async signup(userForm){
        // make request to signup user 
        const requestOptions = {
            method:  "post",
            bodyData: userForm,
            subDirectory: "/auth/register"
        }
        return await this.request(requestOptions)
    }
    async fetchUserFromToken(){
        // handles user fetch from token
        const requestOptions = {
            method: "post",
            headers : {"Bearer": this.token},
            subDirectory: "/auth/me"
        }
        return await this.request(requestOptions);
    }
    async postEntry(entryType, entryData){
        // handles posting new entries to nutrition, sleep, and exercise
        const requestOptions = {
            method: "post",
            bodyData: entryData,
            subDirectory: `/${entryType}/create`
        }
        return await this.request(requestOptions);
    }
    async getEntryById(entryTpe, entryID){
        const requestOptions = {
            // TODO fill this out 
        }
    }
    async getEntries(){

    }
}

export default new ApiClient;