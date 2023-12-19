import { createContext } from "react";
import CobrancaContexto from "../gancho/usarCobrancaContext";

export const CobrancaContexto = createContext();

export function CobrancaContexto(props) {
  const conteudoDaCobranca = CobrancaContexto();
  return (
    <CobrancaContexto.Provider value={conteudoDaCobranca}>
      {props.children}
    </CobrancaContexto.Provider>
  );
}