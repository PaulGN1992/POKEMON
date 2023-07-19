import image from '../../assent/welcome.png'
import pokebola from '../../assent/pokebola.png'
import style from '../LandingPage/LP.module.css'
import { useNavigate } from "react-router-dom"

export default function LP (){
    const navigate= useNavigate();
    const handleClick = ()=>{
        navigate('/home')
    }
 return(
    <div className={style.lp} >
        <img src={image} alt="Bienvenida" />
        <img onClick={()=>handleClick()}className={style.img2} src={pokebola} alt="Bienvenida"></img>
    </div>
)
}