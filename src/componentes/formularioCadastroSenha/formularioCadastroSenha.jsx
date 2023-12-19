import './formularioCadastroSenha.css';

import { useState } from 'react';

import indicatorGreenPage from "./../../assets/Rectangle green.svg";
import indicatorGrayPage from "./../../assets/Rectangle gray.svg";
import olhoAberto from '../../assets/olho-aberto.png';
import olhoFechado from '../../assets/olho-fechado.svg';
import bigCheck from "./../../assets/big check.svg";

import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import api from '../../api/api';

export default function FormularioCadastroSenha({ formulario, setFormulario, setPreenchido}) {
    const [erro, setErro] = useState(false);
    const [erroMensagem, setErroMensagem] = useState("");
    const [visualizarSenha, setVisualizarSenha] = useState(false);
    const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] = useState(false);

    const [concluido, setConcluido] = useState(false);
    
    function tratarMudancas(e) {
        setFormulario({...formulario, [e.target.name]: e.target.value})
    }

  async function verificarCampos(e) {
    e.preventDefault();
    
    try {
      if(formulario.senha !== formulario.confirmarSenha) {
        setErro(true);
        return setErroMensagem("As senhas não coincidem.")
      }
  
      if(!formulario.senha || !formulario.confirmarSenha) {
        setErro(true);
        return setErroMensagem("É necessário preencher todos os campos.")
      } 

      const {confirmarSenha: _, ...restanteDoFormulario} = formulario;
      const resposta = await api.post('/cadastroUsuario', restanteDoFormulario);

      if (resposta.status === 201) {
        setPreenchido(true);
        return setConcluido(true);
      }

    } catch (error) {
      setErro(true);
      setErroMensagem(error.response.data.mensagem);  
    }
  }
    return (
      <div className='formulario-cadastro-senha'>
        {concluido ? 
        <div className="formularioCadastroSucesso">
          <section className='modal-sucesso-secao'>
            <div className="modal-sucesso">
              <img src={bigCheck} alt="Check grande" />
              <p>Cadastro realizado com sucesso!</p>
            </div>
           
              <Link to="/">
                Ir para Login
              </Link>
      
          </section>

          <div className="localizator">
            <img src={indicatorGrayPage} alt="indicador de etapa atual" />
            <img src={indicatorGrayPage} alt="indicador de etapa atual" />
            <img src={indicatorGreenPage} alt="indicador de etapa atual" />
          </div>
        </div>
       : <div className="formularioCadastroSenha">
            <h1>Adicione seus dados</h1>

              <form onSubmit={verificarCampos}>
              <label>Senha*</label>
                <div className='senha'>
                    <TextField className="input-senha inputs"  variant="outlined" type={visualizarSenha ? 'text' : 'password'} placeholder='••••••••' name='senha' onChange={tratarMudancas}/>
                    <img className='olho' src={visualizarSenha ? olhoAberto : olhoFechado} alt="ícone de olho fechado" onClick={() => setVisualizarSenha(!visualizarSenha)}/>
                </div>
                
                <label>Repita a senha*</label>
                <div className='senha'>
                    <TextField className="input-senha inputs"  variant="outlined" type={visualizarConfirmarSenha ? 'text' : 'password'} placeholder='••••••••' name='confirmarSenha' onChange={tratarMudancas}/>
                    <img className='olho' src={visualizarConfirmarSenha ? olhoAberto : olhoFechado} alt="ícone de olho fechado" onClick={() => setVisualizarConfirmarSenha(!visualizarConfirmarSenha)}/>
                </div>
              
                {erro && <div className="cadastro-erro"><span>{erroMensagem}</span></div>}

              <div className="formulario-cadastro-botao">
                <button type='submit'>Finalizar Cadastro</button>
             
                <span>
                  Já possui uma conta? Faça seu <Link to="/">Login</Link>
                </span>
              </div>
            </form>

            <div className="indicadorAtual">
                <img src={indicatorGrayPage} alt="indicador de etapa atual" />
                <img src={indicatorGreenPage} alt="indicador de etapa atual" />
                <img src={indicatorGrayPage} alt="indicador de etapa atual" />
            </div>
        </div> }
      </div>
        
    )
};