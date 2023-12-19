import FormularioCadastroEmail from "../../componentes/formularioCadastroEmail/formularioCadastroEmail";
import FormularioCadastroSenha from "../../componentes/formularioCadastroSenha/formularioCadastroSenha";

import elipseColor from "./../../assets/Ellipse 7 colorida.svg";
import elipseEmpty from "./../../assets/Ellipse 7 vazia.svg";
import step from "./../../assets/Step login.svg";

import "./cadastro.css";
import { useState } from "react";

export default function Cadastro() {
  const [preenchimento1, setPreenchimento1] = useState(false);
  const [preenchimento2, setPreenchimento2] = useState(false);
  const [formulario, setFormulario] = useState({nome_usuario: "", email: "", senha: "", confirmarSenha: ""});
  
  return (
    <div className="pagina-cadastro">
    <aside>
      <section className="cadastro-etapas">
        <section className="cadastro-topicos">
          <div className="topic-inform-data">
            <div className="img-topic">
              <img className="base" src={elipseColor} alt="elipse verde" />
              <h1>Cadastre-se</h1>
            </div>
            <div className="img-step-topic">
              <img className="step-conduction" src={step} alt="barra verde" />
              <h2>Por favor, escreva seu nome e e-mail</h2>
            </div>
          </div>
          <div className="topic-inform-password">
            <div className="img-topic">
              <img className="base-empty" src={preenchimento1 ? elipseColor :elipseEmpty} alt="" />
              <h1>Escolha uma senha</h1>
            </div>
            <div className="img-step-topic">
              <img className="step-conduction" src={step} alt="barra verde" />
              <h2>Escolha uma senha segura</h2>
            </div>
          </div>
          <div className="topic-sucess">
            <div className="img-topic">
              <img className="base-empty" src={preenchimento2 ? elipseColor :elipseEmpty} alt="" />
              <h1>Cadastro realizado com sucesso</h1>
            </div>
            <h2>E-mail e senha cadastrados com sucesso</h2>
          </div>
        </section>
      </section>
    </aside>  
  
      <main>
        {preenchimento1 ? <FormularioCadastroSenha formulario={formulario} setFormulario={setFormulario} setPreenchido={setPreenchimento2}/> : <FormularioCadastroEmail formulario={formulario} setFormulario={setFormulario} setPreenchimento={setPreenchimento1}/>} 
      </main>
    
    </div>
  );
}
