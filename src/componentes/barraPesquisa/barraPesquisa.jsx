import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import usarUsuarioContexto from '../../gancho/usarUsuarioContexto';

export default function BarraPesquisa({referente, clique, setClique}) {
  const token = sessionStorage.getItem("token");
  const {renderizacao, setRenderizacao, setTabelaBusca} = usarUsuarioContexto();
  const [input, setInput] = useState("");

  useEffect(() => {
    if(referente.toUpperCase() === 'CLIENTE') {
      async function buscarClientes() {
        if (input != "") {
          const {data} = await api.get(`/buscarclientes?campo=${input}`, { headers: { Authorization: `Bearer ${token}` },});
          setTabelaBusca(data);
          if(data.length === 0) setTabelaBusca(['nada'])
          setRenderizacao(!renderizacao);
        } else {
          setTabelaBusca([])
          setRenderizacao(!renderizacao);
        }
      }

      buscarClientes();
    } else if (referente.toUpperCase() === 'COBRANCAS'){
      async function buscarCobrancas() {
        if (input != "") {
          const {data} = await api.get(`/buscarcobrancas?campo=${input}`, { headers: { Authorization: `Bearer ${token}` },});
          setTabelaBusca(data);
          if(data.length === 0) setTabelaBusca(['nada'])
          setRenderizacao(!renderizacao);
        } else {
          setTabelaBusca([])
          setRenderizacao(!renderizacao);
        }
      }
      buscarCobrancas();
    } else {
      return;
    }
  }, [clique])

  return (
    <Paper
      component="form"
      sx={{
        p: '2px',
        display: 'flex',
        alignItems: 'center',
        width: 260,
        position: 'relative',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, position: 'relative' }}
        placeholder="Pesquisar"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ 'aria-label': 'pesquisar' }}
      />
      <IconButton 
        onClick={() => setClique(!clique)}
        type="button"
        sx={{position: 'absolute', right: '0', width: '35px', height: '100%' }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
