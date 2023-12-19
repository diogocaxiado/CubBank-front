import './modalSucesso.css';

import iconeSucesso from '../../assets/big check.svg'

export default function modalSucesso() {
    return (
        <div className="modalSucesso">
            <img src={iconeSucesso} alt="Ícone de sucesso" />
            <strong>Cadastro Alterado com sucesso!</strong>
        </div>
    )
}