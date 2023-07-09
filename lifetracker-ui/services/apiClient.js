import axios from "axios";
import { API_BASE_URL } from "../constants"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }
    setToken(token) {
        this.token = token
    }
    getToken(){
        return this.token
    }
    async request({ method, bodyData, subDirectory }) {
        console.log(API_BASE_URL)
         return axios({
            headers: { bearer: this.token || ""},
            method: method,
            data: bodyData,
            url: API_BASE_URL + subDirectory
        }).then((axiosResponse) => {
            // updates response variable if call is successful
            return {
                success: true,
                data: axiosResponse.data,
                statusCode: axiosResponse.status
            }

        }).catch((axiosError) => {
            // update response variable with error if unsuccessful
            return {
                success: false,
                statusCode: axiosError.response?.status,
                error: axiosError,
            }
        });
    }
    async login(credentials) {
        const requestOptions = {
            method: "post",
            bodyData: credentials,
            subDirectory: "/auth/login"
        }
        return this.request(requestOptions);
    }
    async signup(userForm) {
        // make request to signup user 
        const requestOptions = {
            method: "post",
            bodyData: userForm,
            subDirectory: "/auth/register"
        }
        return this.request(requestOptions)
    }
    async fetchUserFromToken() {
        // handles user fetch from token
        const requestOptions = {
            method: "post",
            subDirectory: "/auth/me"
        }
        return this.request(requestOptions);
    }
    async fetchAllUsers(){
        // note, this function returns promise
        const requestOptions = {
            method: "get",
            subDirectory: "/auth/all"
        }
        return this.request(requestOptions)
    }
    async postEntry(entryType, entryData) {
        // handles posting new entries to nutrition, sleep, and exercise
        const requestOptions = {
            method: "post",
            bodyData: entryData,
            subDirectory: `/${entryType}`
        }
        return this.request(requestOptions);
    }
    async deleteEntry(entryType, entryData) {
        // handles posting new entries to nutrition, sleep, and exercise
        const requestOptions = {
            method: "post",
            bodyData: entryData,
            subDirectory: `/${entryType}`
        }
        return this.request(requestOptions);
    }
    async fetchEntryById(resourceType, entryID) {
        // handles id specific entry retrievals
        const requestOptions = {
            method: "get",
            subDirectory: `/${resourceType}/${entryID}`
        }
        return this.request(requestOptions)
    }
    async fetchEntries(resourceType) {
        // handles batch entry retrievals
        const requestOptions = {
            method: "get",
            subDirectory: `/${resourceType}`
        }
        return this.request(requestOptions)
    }
    async fetchResourceStats(resourceType, statId){
        console.log("fetching stats for: ", resourceType)
        const requestOptions = {
            method: "post",
            bodyData: {statId : statId},
            subDirectory: `/${resourceType}/stats`
            
        }
        return this.request(requestOptions);
    }
}

export default new ApiClient;