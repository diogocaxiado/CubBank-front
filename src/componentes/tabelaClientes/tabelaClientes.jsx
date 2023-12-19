import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CobrancaImage from './../../assets/cobranca.png';
import OrdenarImage from './../../assets/ordenar.png';
import ClienteVermelho from './../../assets/cliente-vermelho.svg';
import LupaVermelha from './../../assets/lupa-vermelha.svg';
import FecharVermelho from './../../assets/fechar-vermelho.svg';
import './tabelaClientes.css';
import api from '../../api/api';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';

const criarCobrancaImage = (
  <img
    className="icone-Cobranca"
    src={CobrancaImage}
    alt="Imagem que simboliza uma cobrança"
  />
)

export default function TabelaDeClientes({setEstado}) {
  const token = sessionStorage.getItem("token");
  const [ordenarCliente, setOrdernarCliente] = useState(false);
  const [tabelaExiste, setTabelaExiste] = useState(false);
  const {clientes, setClientes, renderizacao, setRenderizacao, tabelaBusca, setTabelaBusca, setClienteSelecionado, clienteFiltrado, setClienteFiltrado} = usarUsuarioContexto();

  useEffect(() => {
    async function listarClientes() {
      try {
        setTabelaBusca();
        const { data } = await api.get('/listarclientes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const clientes = []
        for (const cliente of data) {
          clientes.push({
            id: cliente.id,
            nome_cliente: cliente.nome_cliente,
            cpf: cliente.cpf,
            email: cliente.email,
            telefone: cliente.telefone,
            status: cliente.status,
            criarCobrancaImage,
          })
        }
        setClientes(clientes)

        if (ordenarCliente) {
          clientes.sort((a, b) => a.nome_cliente.localeCompare(b.nome_cliente));
        }

        if (clienteFiltrado.length) {
          setClientes(clienteFiltrado)
        }

        if(clientes.length) {
          setTabelaExiste(true);
        }

        if (tabelaBusca.length) {
          if (tabelaBusca == 'nada') {
            setClientes([]);
            setTabelaExiste(false);
          }
          setClientes(tabelaBusca)
        }

      } catch (error) {
        console.error(error)
      }
      setClienteFiltrado([])
    }
  
  listarClientes()
  }, [renderizacao])

  function formatarCPF(cpf) {
    let valor = cpf;
  
    valor = valor + '';
    valor = valor.replace(/\D/g, ''); 
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'); 
    valor = valor.replace(/\.(\d{3})(\d{2})$/, '.$1-$2');
  
    return valor;
  }

  return (
    <div>
      <TableContainer
        sx={{ borderRadius: 10 }}
        component={Paper}
        className="tabela-cliente"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{cursor: 'pointer'}} onClick={() => {setOrdernarCliente(!ordenarCliente); setRenderizacao(!renderizacao)}}>
                <img src={OrdenarImage} />
                <strong>Cliente</strong>
              </TableCell>
              <TableCell align="center">
                <strong>CPF</strong>
              </TableCell>
              <TableCell align="center">
                <strong>E-mail</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Telefone</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Criar Cobrança</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {tabelaExiste ? (
            <TableBody>
              {clientes.map((cliente, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <Link to={`/detalhesCliente/${cliente.id}`}>
                      {cliente.nome_cliente}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{formatarCPF(cliente.cpf)}</TableCell>
                  <TableCell align="center">{cliente.email}</TableCell>
                  <TableCell align="center">{cliente.telefone}</TableCell>
                  <TableCell align="center">
                  <div className={cliente.status === 'Inadimplente' ? 'red' : 'green'}>
                    <span
                      className={
                        cliente.status === 'Inadimplente' ? 'redLetter' : 'greenLetter'
                      }
                      >
                      {cliente.status ? cliente.status : "Em dia"}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="center"><div className='cobrancaImagem' style={{cursor: "pointer"}} onClick={() => 
                {setEstado(true);setClienteSelecionado(cliente)} }>{!cliente.criarCobrancaImage ? <img
                  className="icone-Cobranca"
                  src={CobrancaImage}
                  alt="Imagem que simboliza uma cobrança"
                /> : cliente.criarCobrancaImage}</div></TableCell>  
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
    </div>
    )
}
