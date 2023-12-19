import "./tituloPagina.css"

// eslint-disable-next-line react/prop-types
export default function TituloPagina({titulo, icone}) {
    
    return (
        <div className="tituloPagina">
                {icone &&
                <img src={icone} alt="Ícone" />
                }
                <h2>{titulo}</h2>
        </div>
    )
}