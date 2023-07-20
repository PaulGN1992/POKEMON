import imageError from '../../assent/error.png'
import style from '../Error/error.module.css'
export default function Error (){
 return(
    <div className={style.main}>
        <img src={imageError} className={style.error} alt="" />
    </div>
)
}