import './menuLateral.css';

import Home from '../../assets/home.svg';
import HomeSelecionado from '../../assets/home-selecionado.svg';
import Cliente from '../../assets/cliente.svg';
import ClienteSelecionado from '../../assets/cliente-selecionado.svg';
import Cobranca from '../../assets/cobranca.svg';
import CobrancaSelecionado from '../../assets/cobrancas-selecionado.svg';

import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function MenuLateral() {
    const navegacao = useNavigate();
    const parametro = useLocation();
    const { id } = useParams();

    return (
        <nav className='menu-lateral'>
               <div className='hr-vertical' />
               
                <div className={parametro.pathname === "/home" ? "menu-card-selecionado" : "menu-card"} onClick={() => navegacao("/home")}>
                    <img src={parametro.pathname === "/home" ? HomeSelecionado : Home} alt="Home" />
                    <p>Home</p>
                </div>

                <div className={parametro.pathname === "/clientes" || parametro.pathname === `/detalhesCliente/${id}` ? "menu-card-selecionado" : "menu-card"} onClick={() => navegacao("/clientes")}>
                    <img src={parametro.pathname === "/clientes" || parametro.pathname === `/detalhesCliente/${id}`  ? ClienteSelecionado : Cliente} alt="Cliente" />
                    <p>Clientes</p>
                </div>

                <div className={parametro.pathname === "/cobrancas" ? "menu-card-selecionado" : "menu-card"} onClick={() => navegacao("/cobrancas")}>
                    <img src={parametro.pathname === "/cobrancas"? CobrancaSelecionado : Cobranca} alt="Cobranças" />
                    <p>Cobranças</p>
                </div>  
        </nav>
    ) 
}