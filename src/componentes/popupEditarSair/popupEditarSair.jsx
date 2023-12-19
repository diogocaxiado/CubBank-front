import './popupEditarSair.css';

import Editar from '../../assets/editar.svg';
import Sair from '../../assets/sair.svg';
import { useNavigate } from 'react-router-dom';

export default function PopupEditarSair({setEditar}) {
    const navegacao = useNavigate();

    function deslogarUsuario() {
        sessionStorage.clear();  
        navegacao('/');
        return;
    }
    return (
        <div className="botaoEditarSair">
            <div onClick={() => setEditar(true)}>
                <img src={Editar} alt="botão de editar" />
                <span>Editar</span>
            </div>
            <div onClick={() => deslogarUsuario()}>
                <img src={Sair} alt="botão de sair" />
                <span>Sair</span>
            </div>
        </div>
    )
}