import { useContext } from "react";
import { UsuarioContexto } from '../contexto/usuario';

export default function usarUsuarioContexto() {
   return useContext(UsuarioContexto); 
}