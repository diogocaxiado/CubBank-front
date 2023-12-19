import './formularioCadastroEmail.css';

import { useState } from 'react';

import indicatorGreenPage from "./../../assets/Rectangle green.svg";
import indicatorGrayPage from "./../../assets/Rectangle gray.svg";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export default function FormularioCadastroEmail({ formulario, setFormulario, setPreenchimento }) {
  const [erro, setErro] = useState(false);
  
  function tratarMudancas(e) {
    setFormulario({...formulario, [e.target.name]: e.target.value})
  }

  function verificarCampos(e) {
    e.preventDefault();
    
    if(!formulario.nome_usuario || !formulario.email) {
      return setErro(true);
    }

    return setPreenchimento(true);
  }

  return (
    <div className="cadastroFormularioEmail"> 
            <h1>Adicione seus dados</h1>

              <form onSubmit={verificarCampos}>
                  <label>Nome*</label>
                  <TextField
                    id="outlined-basic"
                    label="Digite seu nome"
                    variant="outlined"
                    name='nome_usuario'
                    onChange={tratarMudancas}
                  />
                
                  <label>E-mail*</label>
                  <TextField
                    id="outlined-basic"
                    label="Digite seu e-mail"
                    variant="outlined"
                    name='email'
                    onChange={tratarMudancas}
                  />
              
                {erro ? <div className="cadastro-erro"><span>É necessário preencher todos os campos.</span></div> : ""}

              <div className="formulario-cadastro-botao">
                <button type='submit'>Confirmar</button>
             
                <span>
                  Já possui uma conta? Faça seu <Link to="/">Login</Link>
                </span>
              </div>
            </form>

          <div className="indicadorAtual">
            <img src={indicatorGreenPage} alt="indicador de etapa atual" />
            <img src={indicatorGrayPage} alt="indicador de etapa atual" />
            <img src={indicatorGrayPage} alt="indicador de etapa atual" />
          </div>
    </div>
  )
};