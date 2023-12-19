import "./home.css";
import { useEffect, useState } from "react";

import IconeEmDia from '../../assets/Icone-em-dia.png';
import IconeInadimplentes from '../../assets/Inadimplente.png';

import MenuSuperior from "../../componentes/menuSuperior/menuSuperior";
import MenuLateral from "../../componentes/menuLateral/menuLateral";

import CabecalhoCobrancas from "../../componentes/cabecalhoCobrancas/cabecalhoCobrancas";
import TabelaCobrancas from "../../componentes/tabelaCobrancasComponente/tabelaCobrancasComponente";
import TabelaClientesComponente from '../../componentes/tabelaClientesComponente/tabelaClientesComponente';

import ModalEditarUsuario from '../../componentes/modalEditarUsuario/modalEditarUsuario';
import SucessoAoEditarUsuario from "../../componentes/modalSucesso/modalSucesso";

import MenuBorda from '../../componentes/menuBorda/menuBorda';
import api from "../../api/api"

export default function PaginaHome() {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [requisicaoSucesso, setRequisicaoSucesso] = useState(false);
  const [exibirSucesso, setExibirSucesso] = useState(false);
  const [emDia, setEmDIa] = useState([])
  const [inadimplentes, setInadimplentes] = useState([])
  const [vencidas, setVencidas] = useState([])
  const [pendentes, setPendentes] = useState([])
  const [pagas, setPagas] = useState([])

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

  useEffect(() => {

    const token = sessionStorage.getItem("token")

    async function listarClientes() {
      try {
        const { data } = await api.post("/listarcobrancasclientes", { tabela: "clientes" }, { headers: { 'Authorization': `Bearer ${token}` } });
        const { clientesEmDia, clientesInadimplentes } = data
        setEmDIa(clientesEmDia)
        setInadimplentes(clientesInadimplentes)
      } catch (error) {
        console.error(error)
      }
    }
    listarClientes()

    async function listarCobrancas() {
      try {
        const { data } = await api.post("/listarcobrancasclientes", { tabela: "cobrancas" }, { headers: { 'Authorization': `Bearer ${token}` } });
        const { cobrancasVencidas, cobrancasPendentes, cobrancasPagas } = data
        setVencidas(cobrancasVencidas)
        setPendentes(cobrancasPendentes)
        setPagas(cobrancasPagas)
      } catch (error) {
        console.error(error)
      }
    }
    listarCobrancas()
  }, []);
  let somaPagas = 0
  let somaPendentes = 0
  let somaVencidas = 0
  for (const cobranca of pagas) {
    somaPagas = somaPagas + cobranca.valor
  }
  for (const cobranca of pendentes) {
    somaPendentes = somaPendentes + cobranca.valor
  }
  for (const cobranca of vencidas) {
    somaVencidas = somaVencidas + cobranca.valor
  }

  function formatarMoeda(numero) {
    let valor = numero

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (valor.length > 10) {
      valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");
    }
    return valor
  }

  return (
    <div className="containerPagina">
      <div className="paginaCabecalho">
        <MenuSuperior titulo="Resumo de Cobranças" estado={mostrarOpcoes} setEstado={setMostrarOpcoes} />
        <MenuBorda />
      </div>

      <div className="paginaHome">
        <MenuLateral />

        <div className="tabelas">
          {mostrarOpcoes && <div className="ModalAberto">
            <ModalEditarUsuario setEstado={setMostrarOpcoes} setRequisicaoSucesso={setRequisicaoSucesso} />
          </div>}

          {exibirSucesso && <div className="ModalAberto"><SucessoAoEditarUsuario /></div>}

          <div className="posicaoCabecalhoCobranca">
            <CabecalhoCobrancas key="Pagas1" titulo="Pagas" valor={formatarMoeda(somaPagas)} icone="PAGAS" />
            <CabecalhoCobrancas key="Vencidas1" titulo="Vencidas" valor={formatarMoeda(somaVencidas)} icone="VENCIDAS" />
            <CabecalhoCobrancas key="Previstas1" titulo="Previstas" valor={formatarMoeda(somaPendentes)} icone="PREVISTAS" />
          </div>

          <div className="posicaoTabelaCobranca">
            <TabelaCobrancas key="Pagas" titulo="Pagas" quantidade={pagas.length} cobrancas={pagas} />
            <TabelaCobrancas key="Vencidas" titulo="Vencidas" quantidade={vencidas.length} cobrancas={vencidas} />
            <TabelaCobrancas key="Previstas" titulo="Previstas" quantidade={pendentes.length} cobrancas={pendentes} />
          </div>

          <div className="posicaoTabelaClientes">
            <TabelaClientesComponente key="em" icone={IconeEmDia} nome_cabecalho="em dia" clientes={emDia} />
            <TabelaClientesComponente key="Inadimplentes" icone={IconeInadimplentes} nome_cabecalho="Inadimplentes" clientes={inadimplentes} />
          </div>
        </div>
      </div>
    </div>
  )
}
