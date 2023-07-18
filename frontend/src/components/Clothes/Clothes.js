import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clothesActions} from "../../redux/slices/ClothesSlice";
import Cloth from "./Cloth";

export default function Clothes(){

    const dispatch = useDispatch()

    const {clothes} = useSelector(state => state.clothes)
    console.log(clothes)

    useEffect(()=> {
        dispatch(clothesActions.getAll())
    },[dispatch])

    return(<div>
        {clothes.data?.map(cloth=> <Cloth key={cloth._id} cloth={cloth}/>)}
    </div>)
}