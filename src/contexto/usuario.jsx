import { createContext } from "react";
import usuarioProvedor from "../gancho/usuarioProvedor";

export const UsuarioContexto = createContext();

export function UsuarioProvedor(props) {
    const valoresDoProvedor = usuarioProvedor();
    return (
        <UsuarioContexto.Provider value={valoresDoProvedor}>
            {props.children}
        </UsuarioContexto.Provider>
    )
}