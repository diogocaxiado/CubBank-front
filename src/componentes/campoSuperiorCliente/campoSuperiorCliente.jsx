import './campoSuperiorCliente.css'
import Filtro from './../../assets/filtro.png'
import BarraPesquisa from '../barraPesquisa/barraPesquisa'

export default function CampoSuperiorCliente({setEstado}) {
  return (
    <div className="containerCabecalho">
      <div className="ladoEsquerdo"></div>
      <div className="ladoDireito">
        <button className="btn-add" onClick={() => setEstado(true)}>+ Adicionar  Cliente</button>
        
        <button className='btn-filtro'>
          <img src={Filtro} alt="imagem de um filtro" />
        </button>

        <BarraPesquisa />
      </div>
    </div>
  )
}
