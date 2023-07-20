import {axiosService} from "./axios.service";
import {urls} from "../urls/urls";

const usersService={
    getAll:()=>  axiosService.get(urls.users)
}

export {usersService}