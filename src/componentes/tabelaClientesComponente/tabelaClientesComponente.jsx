import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import "./tabelaClientesComponente.css";
import usarUsuarioContexto from "../../gancho/usarUsuarioContexto";



export default function TabelaClientes({ icone, nome_cabecalho, clientes }) {
    const { setClienteFiltrado } = usarUsuarioContexto()

    let corDeFundo;
    let corDoTexto;

    switch (nome_cabecalho.toUpperCase()) {
        case 'EM DIA':
            corDeFundo = "#EEF6F6";
            corDoTexto = "#1FA7AF";
            break;
        case 'INADIMPLENTES':
            corDeFundo = "#FFEFEF";
            corDoTexto = "#971D1D";
            break;
    }

    function formatarCPF(cpf) {
        let valor = cpf;
      
        valor = valor + '';
        valor = valor.replace(/\D/g, ''); 
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'); 
        valor = valor.replace(/\.(\d{3})(\d{2})$/, '.$1-$2');
      
        return valor;
      }
      

    return (
        <div className="clientesComponenteHome">
            <div className="tabelaComponenteHome">
                <div className="cabecalhoComponenteHome">
                    <div className="nomeTabelaComponenteHome">
                        <img src={icone} alt="Icone" />
                        <h2>Clientes {nome_cabecalho}</h2>
                    </div>
                    <div className='fundoQuantidade' style={{ backgroundColor: corDeFundo }}>
                        <span style={{ color: corDoTexto }}>{clientes.length}</span>
                    </div>
                </div>
                <TableContainer component={Paper} sx={{ borderTop: '1px solid #EFF0F6', minHeight: '14.3rem'}}>
                    <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '1rem', fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }}>Clientes</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }} align="center">ID do cliente</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }} align="center">CPF</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.slice(0, 4).map((cliente) => (
                                <TableRow
                                    key={cliente.nome_cliente}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px' }}>
                                        {cliente.nome_cliente}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px' }} align="center">{cliente.id}</TableCell>
                                    <TableCell sx={{ fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px' }} align="center">{formatarCPF(cliente.cpf)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='rodapeComponenteHome'>
                    <Link onClick={() => setClienteFiltrado(clientes)} to={'/clientes'}>Ver todos</Link>
                </div>
            </div>
        </div>
    );
}