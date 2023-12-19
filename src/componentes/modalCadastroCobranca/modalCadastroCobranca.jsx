/* eslint-disable react-hooks/rules-of-hooks */
import "./modalCadastroCobranca.css";
import { Checkbox, TextField } from "@mui/material";
import IconeCobrancas from "../../assets/iconeCobrancas.png";
import Fechar from "../../assets/Icon.png";
import api from '../../api/api';
import { useState } from "react";
import usarUsuarioContexto from "../../gancho/usarUsuarioContexto";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import IconeSucesso from '../../assets/icone-sucesso.svg';

export default function modalCadastroCobranca({ setEstado }) {
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [formulario, setFormulario] = useState({ nome_cliente: "", descricao: "", vencimento: "", valor: "", status: "Paga" });
    const { clienteSelecionado, setRenderizacao, renderizacao } = usarUsuarioContexto();
 
    const { nome_cliente, id } = clienteSelecionado;
    const token = sessionStorage.getItem('token');

    const [checkbox1, setCheckbox1] = useState(true);
    const [checkbox2, setCheckbox2] = useState(false);

    const Checkbox1Chance = () => {
        setCheckbox1(true);
        setCheckbox2(false);
        setFormulario({ ...formulario, "status": "Paga" })
    };
    const Checkbox2Chance = () => {
        setCheckbox1(false);
        setCheckbox2(true);
        setFormulario({ ...formulario, "status": "Pendente" })
    };

    function formatarMoeda(e) {
        const elemento = document.getElementById('valor');
        let valor = elemento.value;

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        if (valor.length > 10) {
            valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");
        }

        elemento.value = valor;
        if (valor == 'NaN') elemento.value = '';

        const valorParaFormulario = valor.replace(".", "").replace(".", "").replace(",", "")
        setFormulario({ ...formulario, [e.target.name]: e.target.value, "valor": valorParaFormulario })
    }

    function tratarMudancas(e) {
        setFormulario({ ...formulario, [e.target.name]: e.target.value, "nome_cliente": nome_cliente })
    }

    async function enviarFormulario(e) {
        e.preventDefault();

        if (!formulario.descricao || !formulario.vencimento || !formulario.valor) {
            setErro(true);
            setMensagemErro("Todos os campos são obrigatórios.");
            return
        }

        let dadosParaEnviar;
        dadosParaEnviar = {
            cliente_id: id,
            nome_cliente,
            descricao: formulario.descricao,
            vencimento: formulario.vencimento,
            valor: formulario.valor,
            status: formulario.status
        }
        try {
            await api.post("/cadastrocobranca", dadosParaEnviar, { headers: { Authorization: `Bearer ${token}` }});
            toast.success('Cadastro de cobrança concluído com sucesso', {
                position: "bottom-right",
                hideProgressBar: true,
                theme: "colored",
                style: {backgroundColor: "#C3D4FE"},
                bodyStyle: { color: "#243F80", fontSize: '14px'},
                icon: <img src={IconeSucesso}/>
            });
            setEstado(false)

        } catch (error) {
            setErro(true);
            setMensagemErro(error.response.data.mensagem);
        }
        setRenderizacao(!renderizacao);
    }

    return (
        <div className="modalCadastroCobranca">
            <div className="cadastroCobranca">

                <img src={IconeCobrancas} alt="Cadastro" />
                <h1>Cadastro de Cobrança</h1>
            </div>
            <img className="fechar" onClick={() => setEstado(false)} src={Fechar} alt="Fechar" />
            <div>
                <form onSubmit={enviarFormulario} className="formularioCliente">
                    <div className="nome">
                        <label>Nome*</label>
                        <TextField
                            className="inputName"
                            inputProps={{ minLength: 3, maxLength: 30 }}
                            id="outlined-basic"
                            label="Digite seu nome"
                            variant="outlined"
                            name="nome_cliente"
                            value={nome_cliente ?? ""}
                            onChange={tratarMudancas}
                            disabled
                        />
                    </div>

                    <div className="descricao">
                        <label>Descrição*</label>
                        <TextField
                            className="inputDescricao"
                            multiline
                            rows={4}
                            id="outlined-basic"
                            label="Digite a descrição"
                            variant="outlined"
                            name="descricao"
                            onChange={tratarMudancas}
                        />
                    </div>

                    <div className="itens-duplos">
                        <div className="vencimento">
                            <label>Vencimento*</label>
                            <input
                                id="outlined-basic"
                                type="date"
                                name="vencimento"
                                required
                                onChange={tratarMudancas}
                            />
                        </div>
                        <div className="valor">
                            <label>Valor*</label>
                            <input
                                className="input-number"
                                type="text"
                                id="valor"
                                min={1}
                                format="currency"
                                label="Digite o Valor"
                                name="valor"
                                maxLength={14}
                                onChange={formatarMoeda} />
                            <i className={"semErro"}>R$</i>
                        </div>
                    </div>

                    <div className="status">
                        <label>Status*</label>
                        <div className="check1">

                            <Checkbox
                                icon={<CircleIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                overlay
                                variant="outlined"
                                color="success"
                                checked={checkbox1}
                                onChange={Checkbox1Chance}
                            />

                            <label>Cobrança Paga</label>
                        </div>

                        <div className="check2">

                            <Checkbox
                                icon={<CircleIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                variant="soft"
                                color="success"
                                checked={checkbox2}
                                onChange={Checkbox2Chance}
                            />

                            <label>Cobrança Pendente</label>

                        </div>
                    </div>


                    {erro && <div className="cadastro-erro"><span>{mensagemErro}</span></div>}

                    <div className="btns">
                        <button className="btn-cancelar" onClick={() => setEstado(false)}>Cancelar</button>
                        <button className="btn-aplicar" type="submit">Aplicar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


