import "./botaoSecundario.css"

// eslint-disable-next-line react/prop-types
export default function BotaoSecundario({texto, icone, tipo, setEstado}) {
    return (
        <div>
            <button className="botaoSecundario" type={tipo} onClick={setEstado}>
                {icone &&
                <img src={icone} alt="Ícone" />
                }
                {texto}
            </button>
        </div>
    )
}