import { useParams} from "react-router-dom";
import css from "./ClothesDetails.module.css"
import {photoURL} from "../../urls/urls";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clothesActions} from "../../redux/slices/ClothesSlice";

export default function ClothesDetails(){

    const {cloth} = useSelector(state => state);
    const dispatch = useDispatch()


    const {_id} = useParams();



    useEffect(() => {
        dispatch(clothesActions.getById({_id}));
    }, [dispatch, _id]);




    console.log(cloth)


    const allPhotos = cloth.photos.map((photo,index)=>  (
        <img key ={index} src={`${photoURL}/${cloth.photos}`} alt={`Photo ${index +1}`}/>
    ));


    return(<div className={css.container}>
        <div className={css.product}>
            <h3 className={css.title}>{cloth.title}</h3>
            <p className={css.size}>{`${cloth.size}`}</p>
            <p className={css.people}>{cloth.people}</p>
            <p className={css.season}>{`${cloth.season}`}</p>
            <p className={css.type}>{cloth.type}</p>
            <p className={css.materials}>{`${cloth.materials}`}</p>
            <p className={css.avilability}>{cloth.availability}</p>
            <div className={css.photos}>{allPhotos}</div>
            <p className={css.description}>{cloth.description}</p>
            <h3 className={css.price}>{cloth.price}</h3>
        </div>
    </div>)
}