import {axiosService} from "./axios.service";
import {urls} from "../urls/urls";

const clothesService= {
    getAll: () => axiosService.get(urls.clothes)
}


export {clothesService}