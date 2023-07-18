import {useLocation} from "react-router-dom";
import css from "./ClothesDetails.module.css"

export default function ClothesDetails(){

    const location = useLocation()


    const {state} = location;

    const {title, description,size,price,season,people,type,photos,materials,availability} = state;


    const photourls = "https://clothesshopproject.s3.amazonaws.com";

    const allPhotos = photos.map((photo,index)=>  (
        <img key ={index} src={`${photourls}/${photo}`} alt={`Photo ${index +1}`}/>
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
    </div>)
}