import "./botaoFiltro.css";
import Filtro from './../../assets/filtro.png'

export default function BotaoFiltro() {

    return (
        <div>
            <button className='btn-filtro'>
                <img src={Filtro} alt="Imagem de filtro" />
            </button>
        </div>
    )
}