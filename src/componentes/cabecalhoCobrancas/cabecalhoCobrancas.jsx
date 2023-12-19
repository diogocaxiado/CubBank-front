import './cabecalhoCobrancas.css';
import cobrancasPagas from '../../assets/cobrancas-pagas.svg';
import cobrancasVencidas from '../../assets/cobrancas-vencidas.svg';
import cobrancasPrevistas from '../../assets/cobrancas-previstas.svg';

export default function CabecalhoCobrancas({ titulo, valor, icone }) {
    let corDeFundo;
    
    switch (icone) {
        case 'PAGAS':
            icone = cobrancasPagas;
            break;
        case 'VENCIDAS':
            icone = cobrancasVencidas;
            break;
        case 'PREVISTAS':
            icone = cobrancasPrevistas
            break;
    }
      
    if(icone == cobrancasPagas) {
        corDeFundo = "#EEF6F6";
    } else if (icone == cobrancasVencidas) {
        corDeFundo = "#FFEFEF";
    } else {
        corDeFundo = "#FCF6DC";
    }

    return (
        <div className="cabecalhoCobrancas" style={{backgroundColor: corDeFundo}}>
            <img src={icone} alt="icone" />
            
            <div>
                <h2>Cobranças {titulo}</h2>
                <span>R$ {valor}</span>
            </div>
        </div>
    )
}