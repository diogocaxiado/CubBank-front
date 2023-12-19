import "./botaoEditarCliente.css";
import Lapis from "./../../assets/lapis.svg";

const BotaoEditarCliente = ({setEstado}) => {
  return (
    <button className="botaoEditarCliente" onClick={setEstado}>
      <img src={Lapis} alt="lapis editando cliente" />
      <p>Editar Cliente</p>
    </button>
  );
};
export default BotaoEditarCliente;
