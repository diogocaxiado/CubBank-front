import MenuLateral from "../../componentes/menuLateral/menuLateral";
import MenuSuperior from "../../componentes/menuSuperior/menuSuperior";
import MenuBorda from "../../componentes/menuBorda/menuBorda";
import ClienteSimbolo from "../../assets/cliente.svg";
import DadosDoCliente from "../../componentes/dadosDoCliente/dadosDoCliente";
import TabelaCobrancaCliente from "../../componentes/tabelaCobrancaCliente/tabelaCobrancaCliente";
import ModalEditarCliente from '../../componentes/modalEditarCliente/modalEditarCliente';
import ModalEditarUsuario from "../../componentes/modalEditarUsuario/modalEditarUsuario";
import ModalCadastroCobranca from '../../componentes/modalCadastroCobranca/modalCadastroCobranca';
import ModalEditarCobranca from '../../componentes/modalEditarCobranca/modalEditarCobranca';
import ModalDetalheCobranca from '../../componentes/modalDetalheCobranca/modalDetalheCobranca';

import api from "../../api/api";
import { useParams } from "react-router-dom";

import "./detalhesClientes.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import usarUsuarioContexto from "../../gancho/usarUsuarioContexto";
import IconeFechar from '../../assets/icone-fechar.svg';

const detalhesDosClientes = () => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [exibirSucesso, setExibirSucesso] = useState(false);
  const [requisicaoSucesso, setRequisicaoSucesso] = useState(false);
  const [editarCliente, setEditarCliente] = useState(false);
  const [novaCobranca, setNovaCobranca] = useState(false);
  const [modalDetalheCobranca, setModalDetalheCobranca] = useState(false);
  const [chamada, setChamada] = useState(null);
  const [erroApi, setErroApi] = useState(null);
  const token = sessionStorage.getItem("token");
  const { abrirEditarCobranca, setAbrirEditarCobranca } = usarUsuarioContexto()

  const { id } = useParams();

  useEffect(() => {
    const fetchDados = async () => {
      await api
        .get(`/detalheCliente/${id}`, { headers: { Authorization: `Bearer ${token}` }})
        .then((resposta) => {
          const dados = resposta.data;
          const {nome_cliente} = dados.clienteEncontrado;
          setChamada(nome_cliente);
          setErroApi(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados da API:", error);
          setErroApi(true);
        });
    };

    fetchDados();
  }, []);

  const CloseButton = ({ closeToast }) => (
    <img
      src={IconeFechar}
      onClick={closeToast}
    >
    </img>
  );

  return (
    <section className="detalhesDosClientes">
      <div className='paginaCabecalho'>
        <MenuSuperior subTitulo="Clientes" detalheCliente="Detalhes do Cliente" estado={mostrarOpcoes} setEstado={setMostrarOpcoes}/>
        <MenuBorda />
      </div>
      <MenuLateral />

      {mostrarOpcoes && <div className="ModalAberto">
        <ModalEditarUsuario setEstado={setMostrarOpcoes} setRequisicaoSucesso={setRequisicaoSucesso} />
      </div>}

      {exibirSucesso && <div className="ModalAberto"><ModalSucesso /></div>}

      {editarCliente && <div className="ModalAberto"><ModalEditarCliente setEditar={setEditarCliente} id={id}/></div>}

      {novaCobranca && <div className="ModalAberto"><ModalCadastroCobranca setEstado={setNovaCobranca}/></div>}
      
      {abrirEditarCobranca && <div className='ModalAberto'><ModalEditarCobranca setEstado={setAbrirEditarCobranca} /></div>}
    
      {modalDetalheCobranca && <div className='ModalAberto'><ModalDetalheCobranca setEstado={setModalDetalheCobranca} /></div>}
      
      <ToastContainer closeButton={CloseButton}/>

      <main className="clienteEscolhido">
        <div className="perfil">
          <img src={ClienteSimbolo} alt="figura de pessoas" />

          <h1>{chamada}</h1>
        </div>

        <div className="paginaInternoDetalhesCliente">
          <DadosDoCliente estado={editarCliente} id={id} setEstado={() => setEditarCliente(true)}/>
          <TabelaCobrancaCliente setEstado={() => setNovaCobranca(true)} setDetalhe={setModalDetalheCobranca}/>
        </div>
      </main>
    </section>
  );
};

export default detalhesDosClientes;