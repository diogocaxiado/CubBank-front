import "./modalCadastroCliente.css";

import TextField from "@mui/material/TextField";
import Cadastro from "../../assets/Frame.png";
import Fechar from "../../assets/Icon.png";
import api from "../../api/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BotaoSecundario from "../botaoSecundario/botaoSecundario";
import BotaoPadrao from "../botaoPadrao/botaoPadrao";

import { useState } from "react";
import usarUsuarioContexto from "../../gancho/usarUsuarioContexto";
import IconeSucesso from '../../assets/icone-sucesso.svg';

export default function modalCadastroCliente({ setEstadoModal }) {
    const {setRenderizacao, renderizacao} = usarUsuarioContexto();
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");

    const [nome_cliente, setNome_cliente] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [cpfFormatado, setCpfFormatado] = useState("");
    const [telefone, setTelefone] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const token = sessionStorage.getItem('token');
    async function enviarFormulario(e) {
        e.preventDefault();

        let dadosParaEnviar;

        if (nome_cliente || email || cpf || telefone) {
            dadosParaEnviar = {
                ...(nome_cliente && { nome_cliente }),
                ...(email && { email }),
                ...(cpf && { cpf }),
                ...(telefone && { telefone }),
                ...(logradouro && { logradouro }),
                ...(complemento && { complemento }),
                ...(cep && { cep }),
                ...(bairro && { bairro }),
                ...(cidade && { cidade }),
                ...(estado && { estado })
            }
        }
        
        try {
            await api.post("/cadastrocliente", dadosParaEnviar, { headers: { 'Authorization': `Bearer ${token}` } });
            
            setEstadoModal(false);

            toast.success('Cadastro concluído com sucesso', {
                position: "bottom-right",
                hideProgressBar: true,
                theme: "colored",
                style: {backgroundColor: "#C3D4FE"},
                bodyStyle: { color: "#243F80", fontSize: '14px'},
                icon: <img src={IconeSucesso}/>
            });

            setRenderizacao(!renderizacao);

        } catch (error) {
            setErro(true);
            setMensagemErro(error.response.data.mensagem);
        }
    }

    function formatarCPF(valor) {
        valor = valor.replace(/\D/g, ''); 
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'); 
        valor = valor.replace(/\.(\d{3})(\d{2})$/, '.$1-$2');
        return valor;
      }
    
      function removerFormatacao(e) {
        const valorDigitado = e.target.value;
        const cpfFormatado = formatarCPF(valorDigitado);
        setCpfFormatado(cpfFormatado);
    
        const cpfSemFormato = valorDigitado.replace(/\D/g, '');
        setCpf(cpfSemFormato);
      }
    return (
        <div className="modalCadastroCliente">
            <div className="cadastroCliente">
                <img src={Cadastro} alt="Cadastro" />
                <h2>Cadastro do Cliente</h2>
            </div>
            <img className="fechar" onClick={() => setEstadoModal(false)} src={Fechar} alt="Fechar" />
            <div>
                <form onSubmit={enviarFormulario} className="formularioCliente">
                    <div className="nome">
                        <label>Nome*</label>
                        <TextField
                            id="outlined-basic"
                            label="Digite seu nome"
                            name="nome_cliente"
                            value={nome_cliente}
                            onChange={(e) => setNome_cliente(e.target.value)}
                        />
                    </div>

                    <div className="email">
                        <label>E-mail*</label>
                        <TextField
                            id="outlined-basic"
                            label="Digite seu e-mail"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="itens-duplos">
                        <div className="cpf">
                            <label>CPF*</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite seu cpf"
                                name="cpf"
                                value={cpfFormatado}
                                onChange={removerFormatacao}
                                inputProps={{ maxLength: 13 }}
                            />
                        </div>
                        <div className="telefone">
                            <label>Telefone*</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite seu telefone"
                                name="telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                                inputProps={{ maxLength: 11 }}
                            />
                        </div>
                    </div>

                    <div className="endereço">
                        <label>Endereço</label>
                        <TextField
                            id="outlined-basic"
                            label="Digite seu endereço"
                            name="logradouro"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                        />
                    </div>

                    <div className="complemento">
                        <label>Complemento</label>
                        <TextField
                            id="outlined-basic"
                            label="Digite o complemento"
                            name="complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                    </div>

                    <div className="itens-duplos">
                        <div className="cep">
                            <label>CEP</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite seu CEP"
                                name="cep"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                inputProps={{ maxLength: 8 }}
                            />
                        </div>
                        <div className="bairro">
                            <label>Bairro</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite seu bairro"
                                name="bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="itens-duplos">
                        <div className="cidade">
                            <label>Cidade</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite sua cidade"
                                name="cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            />
                        </div>
                        <div className="uf">
                            <label>UF</label>
                            <TextField
                                id="outlined-basic"
                                label="Digite a UF"
                                name="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                inputProps={{ maxLength: 2 }}
                            />
                        </div>
                    </div>
                    {erro && <span>{mensagemErro}</span>}

                    <div className="btns">
                        <BotaoSecundario texto="Cancelar" tipo="button" setEstado={() => setEstadoModal(false)} />
                        <BotaoPadrao texto="Aplicar" tipo="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}
