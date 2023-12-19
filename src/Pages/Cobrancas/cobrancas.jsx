import TabelaCobrancas from '../../componentes/tabelaCobrancas/tabelaCobranca';
import MenuLateral from '../../componentes/menuLateral/menuLateral';
import MenuSuperior from '../../componentes/menuSuperior/menuSuperior';
import ModalEditarUsuario from '../../componentes/modalEditarUsuario/modalEditarUsuario';
import ModalCadastroCliente from '../../componentes/modalCadastroCliente/modalCadastroCliente';
import ModalSucesso from "../../componentes/modalSucesso/modalSucesso";
import TituloPagina from '../../componentes/tituloPagina/tituloPagina';
import iconeCobrancas from '../../assets/iconeCobrancas.png';
import BotaoFiltro from '../../componentes/botaoFiltro/botaoFiltro';
import BarraPesquisa from '../../componentes/barraPesquisa/barraPesquisa';
import './cobrancas.css';
import { useEffect, useState } from 'react';
import MenuBorda from '../../componentes/menuBorda/menuBorda';
import { ToastContainer } from 'react-toastify';
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';
import ModalEditarCobranca from '../../componentes/modalEditarCobranca/modalEditarCobranca';
import ModalDetalheCobranca from '../../componentes/modalDetalheCobranca/modalDetalheCobranca';
import IconeFechar from '../../assets/icone-fechar.svg';

const PaginaCobrancas = () => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [requisicaoSucesso, setRequisicaoSucesso] = useState(false);
  const [exibirSucesso, setExibirSucesso] = useState(false);
  const [modalCadastroCliente, setModalCadastroCliente] = useState(false);
  const [modalDetalheCobranca, setModalDetalheCobranca] = useState(false);
  const {abrirEditarCobranca, setAbrirEditarCobranca } = usarUsuarioContexto()
  const [clique, setClique] = useState(false);

  useEffect(() => {
    if (requisicaoSucesso) {
      setExibirSucesso(true);

      const tempoDeEspera = setTimeout(() => {
        setExibirSucesso(false);
        setRequisicaoSucesso(false);
      }, 3000);

      return () => clearTimeout(tempoDeEspera);
    }
  }, [requisicaoSucesso]);

  const CloseButton = ({ closeToast }) => (
    <img
      src={IconeFechar}
      onClick={closeToast}
    >
    </img>
  );

  return (

    <div className="containerPagina">
      <div className='paginaCabecalho'>
        <MenuSuperior subTitulo="Cobranças" estado={mostrarOpcoes} setEstado={setMostrarOpcoes}/>
        <MenuBorda />
      </div>
      <MenuLateral />

      {mostrarOpcoes && <div className="ModalAberto">
        <ModalEditarUsuario setEstado={setMostrarOpcoes} setRequisicaoSucesso={setRequisicaoSucesso} />
      </div>}

      {exibirSucesso && <div className="ModalAberto"><ModalSucesso /></div>}

      <div className='paginaCobrancasInterno'>
        <div className='barraGeral'>
          <TituloPagina titulo='Cobranças' icone={iconeCobrancas} />
          <div className='barraDireita'>
            <BotaoFiltro />
            <BarraPesquisa referente='COBRANCAS' clique={clique} setClique={setClique}/>
          </div>
        </div>
      
        <TabelaCobrancas setEstado={setModalDetalheCobranca}/>  
      </div>
      {abrirEditarCobranca && <div className='ModalAberto'><ModalEditarCobranca setEstado={setAbrirEditarCobranca} /></div>}
      {modalCadastroCliente && <div className='ModalAberto'><ModalCadastroCliente setEstado={setModalCadastroCliente} /></div>}
      {modalDetalheCobranca && <div className='ModalAberto'><ModalDetalheCobranca setEstado={setModalDetalheCobranca} /></div>}

      <ToastContainer closeButton={CloseButton}/>
    </div>
  )
}

export default PaginaCobrancas