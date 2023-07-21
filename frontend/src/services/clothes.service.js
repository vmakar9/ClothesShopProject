import {axiosService} from "./axios.service";
import {urls} from "../urls/urls";

const clothesService= {
    getAll:() => axiosService.get(urls.clothes),
    getById:(_id)=> axiosService.get(`${urls.clothes}/${_id}`)
}


export {clothesService}