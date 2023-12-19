import './dadosDoCliente.css';
import { useState, useEffect } from 'react';
import BotaoEditarCliente from './../../componentes/botaoEditarCliente/botaoEditarCliente';
import api from '../../api/api'
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';

const DadosDoCliente = ({setEstado, id, estado}) => {
  const {setClienteSelecionado} = usarUsuarioContexto();
  const [clienteEncontrado, setClienteEncontrado] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const detalheCliente = async () => {
    try {
      const {data} = await api.get(`/detalheCliente/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      const {clienteEncontrado} = data;
     
      let clientes;

        clientes = {
            id: clienteEncontrado.id,
            nome_cliente: clienteEncontrado.nome_cliente,
            email: clienteEncontrado.email,
            telefone: clienteEncontrado.telefone,
            cpf: clienteEncontrado.cpf,
            logradouro: clienteEncontrado.logradouro,
            bairro: clienteEncontrado.bairro,
            complemento: clienteEncontrado.complemento,
            cep: clienteEncontrado.cep,
            cidade: clienteEncontrado.cidade,
            estado: clienteEncontrado.estado,
            status: clienteEncontrado.status
        }
        setClienteEncontrado(clientes);
        setClienteSelecionado(clientes);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
      throw error;
    }
  };

  detalheCliente();
  }, [estado]);

  return (
    <article className="dados">
      <div className="parte-superior">
        <h2>Dados do Cliente</h2>
        <BotaoEditarCliente setEstado={setEstado} />
      </div>
      <section className="dados-superior">
        <div className="email titulo">
          <h2>E-mail</h2>
          <p>{clienteEncontrado.email}</p>
        </div>
        <div className="telefone titulo">
          <h2>Telefone</h2>
          <p>{clienteEncontrado.telefone}</p>
        </div>
        <div className="cpf titulo">
          <h2>CPF</h2>
          <p>{clienteEncontrado.cpf}</p>
        </div>
      </section>
      <section className="dados-inferior">
        <div className="endereco titulo">
          <h2>Endereço</h2>
          <p>{clienteEncontrado.logradouro ? clienteEncontrado.logradouro : "não informado."}</p>
        </div>
        <div className="bairro titulo">
          <h2>Bairro</h2>
          <p>{clienteEncontrado.bairro ? clienteEncontrado.bairro : "não informado."}</p>
        </div>
        <div className="complemento titulo">
          <h2>Complemento</h2>
          <p>{clienteEncontrado.complemento ? clienteEncontrado.complemento : "não informado."}</p>
        </div>
        <div className="cep titulo">
          <h2>CEP</h2>
          <p>{clienteEncontrado.cep ? clienteEncontrado.cep : "não informado."}</p>
        </div>
        <div className="cidade titulo">
          <h2>Cidade</h2>
          <p>{clienteEncontrado.cidade ? clienteEncontrado.cidade : "não informado."}</p>
        </div>
        <div className="uf titulo">
          <h2>UF</h2>
          <p>{clienteEncontrado.estado ? clienteEncontrado.estado : "não informado."}</p>
        </div>
      </section>
    </article>
  );
};

export default DadosDoCliente;
