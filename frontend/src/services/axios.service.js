import axios from "axios"
import {baseURL} from "../urls/urls";

const axiosService = axios.create({baseURL})

export {
    axiosService
}
