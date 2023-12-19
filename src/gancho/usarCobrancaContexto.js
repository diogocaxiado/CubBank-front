import { useContext } from "react";
import { CobrancaContexto } from "../contexto/cobranca";

export default function usarCobrancaContexto() {
  return useContext(CobrancaContexto);
}