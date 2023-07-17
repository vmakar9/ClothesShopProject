import css from "./Cloth.module.css"


export default function Cloth({cloth}){
    const link = 'https://clothesshopproject.s3.amazonaws.com'

    return(<div className={css.clotheslist}>
        <div className={css.clothes}>
            <h3 className={css.clothestitle}>{cloth.title}</h3>
            <img className={css.clothesimage} alt={"clothes image"} src={`${link}/${cloth.photos[0]}`}/>
            <p className={css.clothessize}>{`${cloth.size}`}</p>
            <h3 className={css.clothesprice}>{cloth.price}</h3>
        </div>
    </div>)
}