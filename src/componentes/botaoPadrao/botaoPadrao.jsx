import "./botaoPadrao.css"

// eslint-disable-next-line react/prop-types

export default function BotaoPadrao({texto, icone, tipo, setEstado}) {
    return (
        <div>
            <button className="botaoPadrao" type={tipo} onClick={setEstado}>
                {icone &&
                <img src={icone} alt="Ícone" />
                }
                {texto}
            </button>
        </div>
    )
}