import './modalAvisoExcluir.css'
import {useState} from 'react';
import Atencao from './../../assets/atencao.png'
import Close from './../../assets/fechar-modal.svg'

function mensagemDeletar({ cliente, onClose, onConfirm }) {


  return (
    <div className="container-excluir-cobrancas">
      <div className="modal-excluir-cobrancas">
        <div className="botao-fechar">
          <img src={Close} onClick={onClose} alt="fechar" />
        </div>
        <div className="modal-principal">
          <img src={Atencao} alt="Ponto de exclamacao para atencao" />
          <h3>Tem certeza que deseja excluir esta cobrança?</h3>
        </div>
        <div className="modal-excluir-botoes">
          <button type="button" onClick={onClose} className="naoExcluir">
            Não
          </button>
          <button type="button"  onClick={onConfirm}className="excluir">
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default mensagemDeletar;
