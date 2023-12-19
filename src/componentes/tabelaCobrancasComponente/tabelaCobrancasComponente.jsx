/* eslint-disable react/prop-types */
import './tabelaCobrancasComponente.css';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';

// eslint-disable-next-line react/prop-types
export default function TabelaCobrancasComponente({ titulo, quantidade, cobrancas}) {
    const { setCobrancaFiltrada } = usarUsuarioContexto()

    let corDeFundo;
    let corDoTexto;


    // eslint-disable-next-line react/prop-types
    switch (titulo.toUpperCase()) {
        case 'PAGAS':
            corDeFundo = "#EEF6F6";
            corDoTexto = "#1FA7AF";
            break;
        case 'VENCIDAS':
            corDeFundo = "#FFEFEF";
            corDoTexto = "#971D1D";
            break;
        case 'PREVISTAS':
            corDeFundo = "#FCF6DC";
            corDoTexto = "#C5A605";
            break;
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
        <div className="tabelaCobrancasComponente">
            <div className='topoCobrancas'>
                <h3>Cobranças {titulo}</h3>

                <div className='fundoQuantidade' style={{backgroundColor: corDeFundo}}>
                    <span style={{color: corDoTexto}}>{quantidade}</span>
                </div>
            </div>

            <TableContainer component={Paper} sx={{borderTop: '1px solid #EFF0F6', height: "74%"}}>
                <Table sx={{ minWidth: "100%"}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize: '1rem',  fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }}>Cliente</TableCell>
                    <TableCell sx={{fontSize: '1rem',  fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }} align="center">ID da cob.</TableCell>
                    <TableCell sx={{fontSize: '1rem',  fontFamily: 'Nunito', color: '#3F3F55', fontWeight: 700, padding: '10px' }} align="center">Valor</TableCell>
                </TableRow>
                </TableHead>
                <TableBody rowsPerPage>
                {cobrancas.slice(0, 4).map((cobranca) => (
                    <TableRow   
                        key={cobranca.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                        >
                        <TableCell component="th" scope="row" sx={{fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px'}}>
                            {cobranca.nome_cliente}
                        </TableCell>
                        <TableCell sx={{fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px'}} align="center">{cobranca.id}</TableCell>
                        <TableCell sx={{fontFamily: 'Nunito', color: '#6E6E85', fontSize: '0.9rem', padding: '12px'}} align="center">R$ {formatarMoeda(cobranca.valor)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <div className='baixoCobrancas'>
                <Link onClick={() => setCobrancaFiltrada(cobrancas)} to={"/cobrancas"}>Ver todos</Link>
            </div>  
        </div>
    )
}