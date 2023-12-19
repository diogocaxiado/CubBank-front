import "./menuSuperior.css";

import Seta from "../../assets/setinha-baixo.svg";
import { useEffect, useState } from "react";

import PopupEditarSair from "../popupEditarSair/popupEditarSair";

export default function BarraSuperior({
  titulo,
  subTitulo,
  estado,
  setEstado,
  detalheCliente,
}) {
  const [cliqueNaSeta, setCliqueNaSeta] = useState(false);
  const [inicias, setIniciais] = useState("");
  const usuario = sessionStorage.getItem("usuario");
  const nomeUsuario = JSON.parse(usuario).nome_usuario;

  const abrirModal = () => {
    setCliqueNaSeta(!cliqueNaSeta);
  };

  function buscarLetrasIniciais() {
    const filtrarInicias = nomeUsuario.split(" ");
    const nome = filtrarInicias[0];
    const sobrenome = filtrarInicias[1];
    
    if(filtrarInicias.length >= 2) {
      return setIniciais(nome[0] + sobrenome[0])
    } else {
      setIniciais(nome[0])
    }
  }

  useEffect(() => {
    buscarLetrasIniciais();
  }, [])

  return (
    <header>
      <div className={titulo ? "header-titulo" : "header-subtitulo"}>
        <h2>{titulo}</h2>
        <span>{detalheCliente ? <span>{subTitulo}  <span className="detalheCliente"><span className="separacaoDetalheCliente"> {">"} </span> {detalheCliente}</span></span> : subTitulo }</span>
      </div>

      <div className="perfil-menu">
        <div className="foto-perfil">
          <span>{inicias}</span>
        </div>

        <div className="nome-perfil">
          <span>{nomeUsuario}</span>
          <div>
            <button onClick={() => abrirModal()}>
              <img src={Seta} alt="seta para baixo" />
              {cliqueNaSeta && (
                <div className="modalAbertoSuperior">
                  <PopupEditarSair editar={estado} setEditar={setEstado} />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
