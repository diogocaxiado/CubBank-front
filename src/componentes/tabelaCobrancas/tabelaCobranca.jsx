import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import "./tabelaCobranca.css";
import editarCobranca from "../../assets/EditarCobranca.png";
import excluirCobranca from "../../assets/ExcluirCobranca.png";
import OrdenarImage from "./../../assets/ordenar.png";
import api from "../../api/api";
import MensagemDeletar from "../modalAvisoExcluir/modalAvisoExcluir";
import usarUsuarioContexto from "../../gancho/usarUsuarioContexto";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconeError from '../../assets/icone-error.svg';
import IconeSucesso from '../../assets/icone-sucesso.svg';
import ClienteVermelho from './../../assets/cliente-vermelho.svg';
import LupaVermelha from './../../assets/lupa-vermelha.svg';
import FecharVermelho from './../../assets/fechar-vermelho.svg';

const editarCobrancaImage = (
  <img src={editarCobranca} alt="Editar uma cobrança" />
);

const excluirCobrancaImage = (
    <img
      src={excluirCobranca} alt="Excluir uma cobrança"/>
);

function editaData(str) {
  const vencimento = str.split("");
  return `${vencimento[8]}${vencimento[9]}/${vencimento[5]}${vencimento[6]}/${vencimento[0]}${vencimento[1]}${vencimento[2]}${vencimento[3]}`;
}

function editaValor(number) {
  const str = number.toString();
  const centavos = str.split("").reverse();
  const montante = str.slice(-str.length, -2);
  const numeroFormatado = parseFloat(
    `${montante}.${centavos[1]}${centavos[0]}`
  );
  return numeroFormatado.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export default function TabelaCobrancas({setEstado}) {
  const [cobrancas, setCobrancas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [cobrancaEscolhida, setCobrancaEscolhida] = useState(null);
  const [ordenarCliente, setOrdernarCliente] = useState(false);
  const [ordenarCobrancaId, setOrdernarCobrancaId] = useState(false);
  const [tabelaExiste, setTabelaExiste] = useState(false);
  const { setCobrancaId, setAbrirEditarCobranca, cobrancaFiltrada, setCobrancaFiltrada, tabelaBusca, setTabelaBusca, renderizacao, setRenderizacao, setCobrancaSelecionada } = usarUsuarioContexto();

  const excluirCobranca = async () => {
    const token = sessionStorage.getItem("token");
    const idDaCobranca = cobrancaEscolhida.id;
 
    try {
      await api.delete(`/deletarcobranca/${idDaCobranca}`, {headers:{Authorization: `Bearer ${token}`}});

      toast.success('Cobrança excluída com sucesso', {
      position: "bottom-right",
      hideProgressBar: true,
      theme: "colored",
      style: {backgroundColor: "#C3D4FE"},
      bodyStyle: { color: "#243F80", fontSize: '14px'},
      icon: <img src={IconeSucesso}/>
  });
      setModalAberto(false);
      setRenderizacao(!renderizacao);
    } catch (error) {
        toast.error('Esta cobrança não pode ser excluída!', {
        position: "bottom-right",
        hideProgressBar: true,
        theme: "colored",
        style: {backgroundColor: '#F2D6D0'},
        bodyStyle: { color: "#AE1100", fontSize: '14px'},
        icon: <img src={IconeError}/>
    });
      setModalAberto(false);
    }
  }
  
  useEffect(() => {
    async function listarCobrancas() {
      const token = sessionStorage.getItem("token");
      try {
        setTabelaBusca();
        const { data } = await api.get("/listarcobrancas", { headers: { 'Authorization': `Bearer ${token}` } });
        const cobrancas = [];
       
        for (const cobranca of data) {
          cobrancas.push(
            {
              nome_cliente: cobranca.nome_cliente,
              id: cobranca.id,
              valor: cobranca.valor,
              vencimento: cobranca.vencimento,
              status: cobranca.status,
              descricao: cobranca.descricao,
              cliente_id: cobranca.cliente_id
            },
          )
        }
        setCobrancas(cobrancas)

        if (ordenarCliente) {
          cobrancas.sort((a, b) => a.nome_cliente.localeCompare(b.nome_cliente));
        }

        if (ordenarCobrancaId) {
          cobrancas.sort((a, b) => a.id - b.id);
        }

        if (cobrancaFiltrada.length) {
          setCobrancas(cobrancaFiltrada)
        }

        if(cobrancas.length) {
          setTabelaExiste(true);
        }

        if (tabelaBusca.length) {
          if (tabelaBusca == 'nada') {
            setCobrancas([]);
            setTabelaExiste(false);
          }
          setCobrancas(tabelaBusca)
        }

      } catch (error) {
        console.error(error)
      }
      setCobrancaFiltrada([]);
    }
    listarCobrancas();
  }, [renderizacao]);

  const abrirExcluirModal = (cobranca) => {
    setCobrancaEscolhida(cobranca);
    setModalAberto(true);
  };

  return (
    <div>
      <TableContainer sx={{ borderRadius: 10 }} component={Paper} className='tabelaCobranca'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <div className="tituloComImagem" style={{cursor: 'pointer'}} onClick={() => {setOrdernarCliente(!ordenarCliente); setOrdernarCobrancaId(false); setRenderizacao(!renderizacao)}}>
                  <img src={OrdenarImage} />
                  <strong>Cliente</strong>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="tituloComImagem" style={{cursor: 'pointer'}} onClick={() => {setOrdernarCobrancaId(!ordenarCobrancaId); setOrdernarCliente(false); setRenderizacao(!renderizacao)}}>
                  <img src={OrdenarImage} />
                  <strong>ID Cob.</strong>
                </div>
              </TableCell>
              <TableCell align="center">
                <strong>Valor</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Data de Venc.</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Descrição</strong>
              </TableCell>
              <TableCell align="center">
                <strong> </strong>
              </TableCell>
              <TableCell align="center">
                <strong> </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {tabelaExiste ? (
            <TableBody>
              {cobrancas.map((cobranca, index) => (
                <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>
                    {cobranca.nome_cliente}
                  </TableCell>
                  <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>{cobranca.id}</TableCell>
                  <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>{editaValor(cobranca.valor)}</TableCell>
                  <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>{editaData(cobranca.vencimento)}</TableCell>
                  <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>
                    <div
                      className={
                        cobranca.status === "Vencida"
                        ? "red"
                        : cobranca.status === "Pendente"
                        ? "yellow"
                        : "blue"
                      }
                    >
                      <span
                        className={
                          cobranca.status === "Vencida"
                          ? "redLetter"
                            : cobranca.status === "Pendente"
                            ? "yellowLetter"
                            : "blueLetter"
                        }
                      >
                        {cobranca.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setEstado(true)}}>{cobranca.descricao}</TableCell>
                  <TableCell align="center">
                    <div style={{cursor: "pointer"}} onClick={() =>{ setAbrirEditarCobranca(true);  setCobrancaSelecionada(cobranca)}}>
                      {editarCobrancaImage}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div 
                    onClick={() => abrirExcluirModal(cobranca)}
                    style={{cursor:"pointer"}}
                    alt="excluir cobranca" >
                    {excluirCobrancaImage}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            ) : null }
          </Table>
        </TableContainer>
        
            {!tabelaExiste && (
                <div className='tabelaSemDados'>
                  <img src={ClienteVermelho} alt="" id='clienteVermelho'/>
                  <div className='tabelaSemDadosInterno'>
                    <img src={LupaVermelha} alt="" id='lupaVermelha'/>
                    <img src={FecharVermelho} alt="" id='fecharVermelho'/>
                  </div>

                  <div className='tabelaSemDadosTexto'>
                    <h2>Nenhum resultado foi encontrado!</h2>
                    <h3>Verifique se escrita está correta</h3>
                  </div>
                </div>
              )}
            
        {modalAberto && (
          <div className="ModalAbertoGlobal">
        
          <MensagemDeletar
            cliente={cobrancaEscolhida}
            onClose={() => setModalAberto(false)}
            onConfirm={excluirCobranca}
          />
          </div> )}
    </div>
  )
}
