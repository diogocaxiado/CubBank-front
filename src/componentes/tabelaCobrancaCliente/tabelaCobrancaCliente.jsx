import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import OrdernarImage from './../../assets/ordenar.png'
import editarCobranca from '../../assets/EditarCobranca.png'
import excluirCobranca from '../../assets/ExcluirCobranca.png'
import BotaoPadraoNovaCobranca from './../botaoPadraoNovaCobranca/botaoPadraoNovaCobranca'
import IconeAdd from '../../assets/adicionar.svg'
import './tabelaCobrancaCliente.css'
import api from '../../api/api'
import { useEffect, useState } from 'react'
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto'
import ModalEditarCobranca from '../modalEditarCobranca/modalEditarCobranca'
import { toast } from 'react-toastify';
import ModalExcluirCobranca from "../modalAvisoExcluir/modalAvisoExcluir"
import IconeError from '../../assets/icone-error.svg';
import IconeSucesso from '../../assets/icone-sucesso.svg';

const editarCobrancaImage = (
  <img src={editarCobranca} alt="Editar uma cobrança" />
)
const excluirCobrancaImage = (
  <img src={excluirCobranca} alt="Excluir uma cobrança" />
)

function editaData(str) {
  const vencimento = str.split('')
  return `${vencimento[8]}${vencimento[9]}/${vencimento[5]}${vencimento[6]}/${vencimento[0]}${vencimento[1]}${vencimento[2]}${vencimento[3]}`
}

function editaValor(number) {
  const str = number.toString()
  const centavos = str.split('').reverse()
  const montante = str.slice(-str.length, -2)
  const numeroFormatado = parseFloat(`${montante}.${centavos[1]}${centavos[0]}`)
  return numeroFormatado.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function TabelaDeCobrancaClientes({setEstado, setDetalhe}) {
  const {setCobrancaId, clienteSelecionado, renderizacao, setRenderizacao, setAbrirEditarCobranca, cobrancaSelecionada,setCobrancaSelecionada} = usarUsuarioContexto();
  const {nome_cliente} = clienteSelecionado

  const [cobrancas, setCobrancas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [cobrancaEscolhida, setCobrancaEscolhida] = useState(null);
  const [ordenarCobrancaId, setOrdernarCobrancaId] = useState(false);
  const [ordernarDataVencimento, setOrdernarDataVencimento] = useState(false);
  const token = sessionStorage.getItem("token");

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

  const excluirCobrancaFuncao = async () => {
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
      try {
        const { data } = await api.get("/listarcobrancas", { headers: { 'Authorization': `Bearer ${token}` } });
        const cobrancas = [];
        for (const cobranca of data) {
          if (cobranca.nome_cliente === nome_cliente) {
            cobrancas.push(
              {
                nome_cliente: cobranca.nome_cliente,
                id: cobranca.id,
                vencimento: cobranca.vencimento,
                valor: cobranca.valor,
                status: cobranca.status,
                descricao: cobranca.descricao,
                cliente_id: cobranca.cliente_id
            })
        }}
        setCobrancas(cobrancas)

        if (ordenarCobrancaId) {
          cobrancas.sort((a, b) => a.id - b.id);
        }

        if (ordernarDataVencimento) {
          cobrancas.sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));
        }

      } catch (error) {
        console.error(error)
      }
    }
    listarCobrancas();
  }, [renderizacao, clienteSelecionado]);

  const abrirExcluirModal = (cobranca) => {
    setCobrancaEscolhida(cobranca);
    setModalAberto(true);
  };

  return (
    <section className="tebela-completa">
      <div className="cabecalhoTabela">
        <strong>Cobrança do Cliente</strong>
        <BotaoPadraoNovaCobranca icone={IconeAdd} texto="Nova cobrança" tipo="button" setEstado={setEstado} />
      </div>
      <TableContainer sx={{ borderRadius: 0, borderEndStartRadius: 30, borderEndEndRadius: 30 }} component={Paper} className="tabela-cobranca">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setOrdernarCobrancaId(!ordenarCobrancaId); setOrdernarDataVencimento(false); setRenderizacao(!renderizacao)}}>
                <img src={OrdernarImage} />
                <strong>ID Cob.</strong>
              </TableCell>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setOrdernarDataVencimento(!ordernarDataVencimento); setOrdernarCobrancaId(false); setRenderizacao(!renderizacao)}}>
                <img src={OrdernarImage} />
                <strong>Data de venc.</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Valor</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Descrição</strong>
              </TableCell>
              <TableCell align="center">
                <strong></strong>
              </TableCell>
              <TableCell align="center">
                <strong></strong>
              </TableCell>
              <TableCell align="center">
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cobrancas.slice(0, 4).map((cobranca, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center' style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setDetalhe(true)}}>
                {cobranca.id}
              </TableCell>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setDetalhe(true)}}>{editaData(cobranca.vencimento)}</TableCell>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setDetalhe(true)}}>{editaValor(cobranca.valor)}</TableCell>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setDetalhe(true)}}>
                <div className={
                  cobranca.status === 'Vencida' ? 'red' : cobranca.status === 'Pendente' ? 'yellow' : 'blue'
                }>
                  <span
                    className={
                      cobranca.status === 'Vencida' ? 'redLetter' : cobranca.status === 'Pendente' ? 'yellowLetter' : 'blueLetter'
                    }
                  >
                    {cobranca.status}
                  </span>
                </div>
              </TableCell>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setCobrancaId(cobranca.id); setDetalhe(true)}}>{cobranca.descricao}</TableCell>
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
        </Table>
        {modalAberto && (
        <div className="ModalAbertoGlobal">
      <ModalExcluirCobranca
          cliente={cobrancaSelecionada}
          onClose={() => setModalAberto(false)}
          onConfirm={excluirCobrancaFuncao}
          />
        </div>
      )}
      </TableContainer>
    </section>
  )
}
