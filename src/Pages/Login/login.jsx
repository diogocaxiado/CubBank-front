import "./login.css";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from '../../api/api';
import loginImagem from "./../../assets/login-image.jpeg";
import TextField from "@mui/material/TextField";

export default function Login() {
  const [formulario, setFormulario] = useState({email: "", senha: ""});
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const navegacao = useNavigate();

  function tratarMudancas(e) {
    setFormulario({...formulario, [e.target.name]: e.target.value})
  }

  async function enviarFormulario(e) {
    e.preventDefault();

    try {
        const resposta = await api.post("/loginusuario", formulario);    
      
        sessionStorage.setItem('token', resposta.data.token);
        sessionStorage.setItem('usuario', JSON.stringify(resposta.data.usuario));
        navegacao('/home');
    } catch (error) {
        console.error(error)
        setErro(true);
        setMensagemErro(error.response.data.mensagem)
    }
}

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      navegacao("/home");
    }
  }, []);

  return (
    <div className="pagina-login">
      <aside className="login-lateral">
        <p>Gerencie todos os pagamentos da sua empresa em um só lugar.</p>

        <img
          src={loginImagem}
          alt="computador e planta, com frase"
        />
      </aside>

      <main className="login-principal">
      
            <h1>Faça seu login!</h1>
            <form onSubmit={enviarFormulario}>
          
                <label>E-mail</label>
                <TextField
                  label="Digite seu e-mail"
                  variant="outlined"
                  name="email"
                  onChange={tratarMudancas}
                />
              
              <div className="formulario-login-senha">
                <label>Senha</label>
                <a href="#" className="ancora-login">Esqueceu a senha?</a>
              </div>
                <TextField
                  label="Digite sua senha"
                  variant="outlined"
                  name="senha"
                  type="password"
                  onChange={tratarMudancas}
                  />
                  
              {erro ? <div className="login-erro"><span>{mensagemErro}</span></div> : ""}
              <div className="formulario-login-botao">
                <button type="submit">Entrar</button>
              </div>
              </form>

            <div className="acesso">
              <span>
                Ainda não possui uma conta? <Link to="/cadastro" className="ancora-login">Cadastre-se</Link>
              </span>
            </div>
      </main>
    </div>
  );
}
