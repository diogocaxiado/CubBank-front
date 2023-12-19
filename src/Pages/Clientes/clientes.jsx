import TabelaDeClientes from "../../componentes/tabelaClientes/tabelaClientes";
import MenuLateral from "../../componentes/menuLateral/menuLateral";
import MenuSuperior from "../../componentes/menuSuperior/menuSuperior";
import ModalEditarUsuario from "../../componentes/modalEditarUsuario/modalEditarUsuario";
import ModalCadastroCliente from "../../componentes/modalCadastroCliente/modalCadastroCliente";
import ModalCadastroCobranca from "../../componentes/modalCadastroCobranca/modalCadastroCobranca";
import ModalSucesso from "../../componentes/modalSucesso/modalSucesso";
import TituloPagina from "../../componentes/tituloPagina/tituloPagina";
import iconeCLiente from "../../assets/Frame.png";
import Add from "../../assets/add.png";
import BotaoPadrao from "../../componentes/botaoPadrao/botaoPadrao";
import BotaoFiltro from "../../componentes/botaoFiltro/botaoFiltro";
import BarraPesquisa from "../../componentes/barraPesquisa/barraPesquisa";
import "./clientes.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MenuBorda from "../../componentes/menuBorda/menuBorda";
import IconeFechar from '../../assets/icone-fechar.svg';

const PaginaClientes = () => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [requisicaoSucesso, setRequisicaoSucesso] = useState(false);
  const [exibirSucesso, setExibirSucesso] = useState(false);
  const [modalCadastroCliente, setModalCadastroCliente] = useState(false);
  const [modalCadastroCobranca, setModalCadastroCobranca] = useState(false);
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
    <div className="paginaClientes">
      <div className="paginaCabecalho">
        <MenuSuperior
          subTitulo="Clientes"
          estado={mostrarOpcoes}
          setEstado={setMostrarOpcoes}
        />
        <MenuBorda />
      </div>
      <MenuLateral />

      {mostrarOpcoes && (
        <div className="ModalAberto">
          <ModalEditarUsuario
            setEstado={setMostrarOpcoes}
            setRequisicaoSucesso={setRequisicaoSucesso}
          />
        </div>
      )}

      {exibirSucesso && (
        <div className="ModalAberto">
          <ModalSucesso />
        </div>
      )}

      <div className="paginaClientesInterno">
        <div className="barraGeral">
          <TituloPagina titulo="Clientes" icone={iconeCLiente} />
          <div className="barraDireita">
            <BotaoPadrao
              setEstado={() => setModalCadastroCliente(true)}
              texto="Adicionar  Cliente"
              icone={Add}
            />
            <BotaoFiltro />
            <BarraPesquisa referente='CLIENTE' clique={clique} setClique={setClique}/>
          </div>
        </div>

        <TabelaDeClientes setEstado={() => setModalCadastroCobranca(true)} />
      </div>

      {modalCadastroCliente && (
        <div className="ModalAberto">
          <ModalCadastroCliente setEstadoModal={setModalCadastroCliente} />
        </div>
      )}
      {modalCadastroCobranca && (
        <div className="ModalAberto">
          <ModalCadastroCobranca setEstado={setModalCadastroCobranca} />
        </div>
      )}

      <ToastContainer closeButton={CloseButton}/>
    </div>
  );
};

export default PaginaClientes;
