import {useLocation} from "react-router-dom";
import css from "./ClothesDetails.module.css"
import {photoURL} from "../../urls/urls";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userActions} from "../../redux/slices/UsersSlice";

export default function ClothesDetails(){

    const location = useLocation()

    const dispatch = useDispatch()

    const {state} = location;

    const { title, description,size,price,season,people,type,photos,materials,availability,userId} = state;

    useEffect(()=> {
        dispatch(userActions.getUser(userId))
    },[dispatch,userId])

    const author = useSelector((state) => {
        const users = state.users;
        if (users) {
            return users.find((user) => user._id ===   userId);
        }
        return null; // або можна повернути пустий об'єкт {} замість null, якщо потрібно
    });






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
        {author && (
            <div>
                <h4>Autor:</h4>
                <p>{author.name}</p>
                <p>{author.email}</p>
                {/* Інші дані про користувача */}
            </div>
        )}
    </div>)
}