import {useLocation} from "react-router-dom";
import css from "./ClothesDetails.module.css"
import {photoURL} from "../../urls/urls";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux/slices/UsersSlice";

export default function ClothesDetails(){

    const location = useLocation()

    const dispatch = useDispatch()

    const {user} = useSelector(state =>  state.user)

    useEffect(()=>  {
        dispatch(userActions.getUser())
    },[dispatch])


    const {state} = location;

    const {title, description,size,price,season,people,type,photos,materials,availability,user_id} = state;

    const clothesCreator = user.filter(clothCreator => user_id.includes(clothCreator._id))

    console.log(clothesCreator)

    const allPhotos = photos.map((photo,index)=>  (
        <img key ={index} src={`${photoURL}/${photo}`} alt={`Photo ${index +1}`}/>
    ));


    return(<div className={css.container}>
        <div className={css.product}>
            <h3 className={css.title}>{title}</h3>
            <p className={css.size}>{`${size}`}</p>
            <p className={css.people}>{people}</p>
            <p className={css.season}>{`${season}`}</p>
            <p className={css.type}>{type}</p>
            <p className={css.materials}>{`${materials}`}</p>
            <p className={css.avilability}>{availability}</p>
            <div className={css.photos}>{allPhotos}</div>
            <p className={css.description}>{description}</p>
            <h3 className={css.price}>{price}</h3>
        </div>
        <div>
            {clothesCreator?.map(clothCreator =>  (<p key={clothCreator._id}>{clothCreator.name}</p>))}
        </div>
    </div>)
}