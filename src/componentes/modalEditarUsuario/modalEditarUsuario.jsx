import './modalEditarUsuario.css';

import sucessoAoEditarUsuario from '../modalSucesso/modalSucesso';
import { TextField } from '@mui/material';
import fechar from '../../assets/fechar-modal.svg';
import olhoFechado from '../../assets/olho-fechado.svg';
import olhoAberto from '../../assets/olho-aberto.png';
import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function ModalEditarUsuario({setEstado, setRequisicaoSucesso}) {
    const usuario = sessionStorage.getItem('usuario');
    
    const [formulario, setFormulario] = useState({nome_usuario: JSON.parse(usuario).nome_usuario, email: JSON.parse(usuario).email, cpf: JSON.parse(usuario).cpf ?? "", telefone: JSON.parse(usuario).telefone ?? ""});
    const [visualizarSenha, setVisualizarSenha] = useState(false);
    const [visualizarConfirmarSenha, setVisualizarConfirmarSenha] = useState(false);

    const [erroSenha, setErroSenha] = useState(false);
    const [erro, setErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState(false);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        if (formulario.cpf === '') {
            const {cpf: _, ...restante} = formulario
            setFormulario(restante)
        }

        if (formulario.telefone === '') {
            const {telefone: _, ...restante} = formulario
            setFormulario(restante)
        }
    }, [])

    function tratarMudancas(e) {
        setFormulario({...formulario, [e.target.name]: e.target.value})
    }

    async function enviarFormulario(e) {
        e.preventDefault();
        
        if (formulario.senha !== formulario.confirmarSenha) {
            setErroSenha(true);
        } else {
            setErroSenha(false);
        }

        try {
            const {confirmarSenha: _, ...restanteDoFormulario} = formulario
            await api.put("/atualizarUsuario", restanteDoFormulario, {headers: { 'Authorization': `Bearer ${token}`}});
            sessionStorage.setItem('usuario', JSON.stringify(restanteDoFormulario));
            
            setEstado(false);
            setErro(false);
            setRequisicaoSucesso(true);

        } catch (error) {
            console.error(error.message)
            setErro(true);
            setMensagemErro(error.response.data.mensagem)
        }
    }

    return (
        <div className="modalEditarUsuario">
            <h2 className='modalTitulo'>Edite seu cadastro</h2>
            <img className="modal-fechar" onClick={() => setEstado(false)} src={fechar} alt="botão para fechar o modal" />

            <form onSubmit={enviarFormulario}>
                <label>Nome*</label>
                <TextField id="input-nome" className="inputs" label="Digite seu nome" variant="outlined" name='nome_usuario' value={formulario.nome_usuario} onChange={tratarMudancas} required/>

                <label>E-mail*</label>
                <TextField id="input-email" className="inputs" label="Digite seu e-mail" variant="outlined" name='email' value={formulario.email} onChange={tratarMudancas} required/>

                <div className='campo-cpf-telefone'>
                    <div>
                        <label>CPF</label>
                        <TextField id="input-cpf" className="inputs" label="Digite seu CPF" variant="outlined" name='cpf' value={formulario.cpf} onChange={tratarMudancas} inputProps={{ maxLength: 11 }} />
                    </div>
                    <div>   
                        <label>Telefone</label>
                        <TextField id="input-telefone" className="inputs" label="Digite seu Telefone" variant="outlined" name='telefone' value={formulario.telefone} onChange={tratarMudancas} inputProps={{ maxLength: 11 }} />
                    </div>
                </div>

                <label>Nova Senha</label>
                <div className='senha'>
                    <TextField className="input-senha inputs"  variant="outlined" type={visualizarSenha ? 'text' : 'password'} placeholder='••••••••' name='senha' onChange={tratarMudancas} />
                    <img className='olho' src={visualizarSenha ? olhoAberto : olhoFechado} alt="ícone de olho fechado" onClick={() => setVisualizarSenha(!visualizarSenha)}/>
                </div>

                <label>Confirmar Senha</label>
                <div className='senha'>
                    <TextField className="input-senha inputs" variant="outlined" type={visualizarConfirmarSenha ? 'text' : 'password'} placeholder='••••••••' name='confirmarSenha' helperText={erroSenha ? "As senhas não coincidem" : ""} onChange={tratarMudancas} />
                    <img className='olho' src={visualizarConfirmarSenha ? olhoAberto : olhoFechado} alt="ícone de olho fechado" onClick={() => setVisualizarConfirmarSenha(!visualizarConfirmarSenha)}/>
                </div>
                {erro && <span className='mensagemErro'>{mensagemErro}</span>}

                <div className='botao-aplicar'>
                    <button type='submit'>Aplicar</button>
                </div>
            </form>
        </div> 
    )
}