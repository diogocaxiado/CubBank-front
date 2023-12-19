/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

export default function usuarioProvedor() {
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [cobrancaSelecionada, setCobrancaSelecionada] = useState({});
    const [clientes, setClientes] = useState([]);
    const [renderizacao, setRenderizacao] = useState(false);
    const [abrirEditarCobranca, setAbrirEditarCobranca] = useState(false)
    const [clienteFiltrado, setClienteFiltrado] = useState([]);
    const [cobrancaFiltrada, setCobrancaFiltrada] = useState([]);
    const [tabelaBusca, setTabelaBusca] = useState([]);
    const [cobrancaId, setCobrancaId] = useState([]);

    return {
        clienteSelecionado,
        setClienteSelecionado,
        cobrancaSelecionada,
        setCobrancaSelecionada,
        clientes,
        setClientes,
        renderizacao,
        setRenderizacao,
        abrirEditarCobranca, 
        setAbrirEditarCobranca,
        clienteFiltrado, 
        setClienteFiltrado,
        cobrancaFiltrada, 
        setCobrancaFiltrada,
        tabelaBusca,
        setTabelaBusca,
        cobrancaId,
        setCobrancaId
    }
}