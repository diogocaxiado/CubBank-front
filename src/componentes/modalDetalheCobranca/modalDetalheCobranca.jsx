import Fechar from './../../assets/fechar-modal.svg'
import Cobranca from './../../assets/cobranca.svg'
import './modalDetalheCobranca.css'
import { useEffect, useState } from 'react';
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';
import api from '../../api/api';

function ModalDetalheCobranca({setEstado}) {
  const token = sessionStorage.getItem('token');
  const [cobrancas, setCobrancas] = useState([]);
  const {cobrancaId} = usarUsuarioContexto();

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

  useEffect(() => {
    async function detalheCobranca() {
      try {
        const {data} = await api.get(`/detalhecobranca/${cobrancaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let cobrancas = [];
          cobrancas = ({
            id: data.id,
            nome_cliente: data.nome_cliente,
            descricao: data.descricao,
            status: data.status,
            valor: editaValor(data.valor),
            vencimento: editaData(data.vencimento),
            cliente_id: data.cliente_id
          });
        
        setCobrancas(cobrancas);
      } catch (error) {
        console.log(error.message);
      }
    }
    detalheCobranca();
  }, []);

  return (
    <div className="modal-detalhe-cobranca">
      <div className="detalhe-cobranca">
        <div className="botao-fechar">
          <img src={Fechar} alt="fechar" onClick={() => setEstado(false)}/>
        </div>
        <div className="modal-cabecalho">
          <img src={Cobranca} alt="icone cobranças" />
          <h1>Detalhe da Cobrança</h1>
        </div>
        <div className="dados-modal">
          <div className="dados-modal-cobranca">
            <span className="titulo-detalhe-cobranca">Nome</span>
            <span className='texto-detalhe-cobranca'>{cobrancas.nome_cliente}</span>
          </div>
          <div className="dados-modal-cobranca">
            <span className="titulo-detalhe-cobranca">Descrição</span>
            <span className='descricao-detalhe-cobranca'>
              {cobrancas.descricao}
            </span>
          </div>

          <div className="detalhe-dividido">
            <div className="dados-modal-cobranca">
              <span className="titulo-detalhe-cobranca">Vencimento</span>
              <span className='texto-detalhe-cobranca'>{cobrancas.vencimento}</span>
            </div>
            <div className="dados-modal-cobranca">
              <span className="titulo-detalhe-cobranca">Valor</span>
              <span className='texto-detalhe-cobranca'>{cobrancas.valor}</span>
            </div>
          </div>
          <div className="detalhe-dividido">
            <div className="dados-modal-cobranca">
              <span className="titulo-detalhe-cobranca">ID cobrança</span>
              <span className='texto-detalhe-cobranca'>{cobrancas.id}</span>
            </div>
            <div className="dados-modal-cobranca">
              <span className="titulo-detalhe-cobranca">Status</span>
              <div
                className={
                  cobrancas.status === 'Vencida'
                    ? 'vermelho'
                    : cobrancas.status === 'Pendente'
                    ? 'amarelo'
                    : 'azul'
                }
              >
                <span
                  className={
                    cobrancas.status === 'Vencida'
                      ? 'vermelhoLetra'
                      : cobrancas.status === 'Pendente'
                      ? 'amareloLetra'
                      : 'azulLetra'
                  }
                >
                  {cobrancas.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetalheCobranca
