import './modalEditarCliente.css'

import TextField from '@mui/material/TextField'
import Cadastro from '../../assets/Frame.png'
import Fechar from '../../assets/Icon.png'
import api from '../../api/api'

import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BotaoPadrao from '../botaoPadrao/botaoPadrao'
import BotaoSecundario from '../botaoSecundario/botaoSecundario'

import usarUsuarioContexto from '../../gancho/usarUsuarioContexto'
import IconeSucesso from '../../assets/icone-sucesso.svg';
import { useState } from 'react'

export default function modalEditarCliente({ setEditar, id }) {
  const token = sessionStorage.getItem('token');
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const { clienteSelecionado } = usarUsuarioContexto();

  const [nome_cliente, setNome_cliente] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [complemento, setComplemento] = useState('')
  const [cep, setCep] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  useEffect(() => {
    if (clienteSelecionado) {
      setNome_cliente(clienteSelecionado.nome_cliente || '')
      setEmail(clienteSelecionado.email || '')
      setCpf(clienteSelecionado.cpf || '')
      setTelefone(clienteSelecionado.telefone || '')
      setLogradouro(clienteSelecionado.logradouro || '')
      setComplemento(clienteSelecionado.complemento || '')
      setCep(clienteSelecionado.cep || '')
      setBairro(clienteSelecionado.bairro || '')
      setCidade(clienteSelecionado.cidade || '')
      setEstado(clienteSelecionado.estado || '')
    }
  }, [clienteSelecionado])

  async function enviarFormulario(e) {
    e.preventDefault()

    let dadosParaEnviar;

    if(nome_cliente || email || cpf || telefone) {
        dadosParaEnviar = {
            ...(nome_cliente && {nome_cliente}),
            ...(email && {email}),
            ...(cpf && {cpf}),
            ...(telefone && {telefone}),
            ...(logradouro && {logradouro}),
            ...(complemento && {complemento}),
            ...(cep && {cep}),
            ...(bairro && {bairro}),
            ...(cidade && {cidade}),
            ...(estado && {estado})
        }
    }
 
    try {
        await api.put(`/atualizarCliente/${id}`, dadosParaEnviar, {headers: {Authorization: `Bearer ${token}`}});
        setEditar(false);

        toast.success('Edições do cadastro concluídas com sucesso', {
          position: "bottom-right",
          hideProgressBar: true,
          theme: "colored",
          style: {backgroundColor: "#C3D4FE"},
          bodyStyle: { color: "#243F80", fontSize: '14px'},
          icon: <img src={IconeSucesso}/>
        });

    } catch (error) {
        setErro(true);
        setMensagemErro(error.response.data.mensagem)
    }
  }

  return (
    <div className="modalEditarCliente">
      <div className="editarCliente">
        <img src={Cadastro} alt="Cadastro" />
        <h2>Editar Cliente</h2>
      </div>
      <img
        className="fechar"
        onClick={() => setEditar(false)}
        src={Fechar}
        alt="Fechar"
      />
      <div>
        <form onSubmit={enviarFormulario} className="formularioCliente">
          <div className="nome">
            <label>Nome*</label>
            <TextField
              id="outlined-basic"
              label="Digite seu nome"
              name="nome_cliente"
              value={nome_cliente}
              onChange={(e) => setNome_cliente(e.target.value)}
            />
          </div>

          <div className="email">
            <label>E-mail*</label>
            <TextField
              id="outlined-basic"
              label="Digite seu e-mail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="itens-duplos">
            <div className="cpf">
              <label>CPF*</label>
              <TextField
                id="outlined-basic"
                label="Digite seu cpf"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                inputProps={{ maxLength: 11 }}
              />
            </div>
            <div className="telefone">
              <label>Telefone*</label>
              <TextField
                id="outlined-basic"
                label="Digite seu telefone"
                name="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                inputProps={{ maxLength: 11 }}
              />
            </div>
          </div>

          <div className="endereço">
            <label>Endereço</label>
            <TextField
              id="outlined-basic"
              label="Digite seu endereço"
              name="logradouro"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
            />
          </div>

          <div className="complemento">
            <label>Complemento</label>
            <TextField
              id="outlined-basic"
              label="Digite o complemento"
              name="complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </div>

          <div className="itens-duplos">
            <div className="cep">
              <label>CEP</label>
              <TextField
                id="outlined-basic"
                label="Digite seu CEP"
                name="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                inputProps={{ maxLength: 8 }}
              />
            </div>
            <div className="bairro">
              <label>Bairro</label>
              <TextField
                id="outlined-basic"
                label="Digite seu bairro"
                name="bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
          </div>

          <div className="itens-duplos">
            <div className="cidade">
              <label>Cidade</label>
              <TextField
                id="outlined-basic"
                label="Digite sua cidade"
                name="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div className="uf">
              <label>UF</label>
              <TextField
                id="outlined-basic"
                label="Digite a UF"
                name="uf"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                inputProps={{ maxLength: 2 }}
              />
            </div>
          </div>
          {erro && <span>{mensagemErro}</span>}

          <div className="btns">
            <BotaoSecundario texto="Cancelar" tipo="button" setEstado={() => setEditar(false)}/>
            <BotaoPadrao texto="Aplicar" tipo="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
