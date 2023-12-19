import Login from './Pages/Login/login'
import Cadastro from './Pages/Cadastro/cadastro'
import PaginaHome from './Pages/Home/home'
import Clientes from './Pages/Clientes/clientes'
import DetalhesClientes from './Pages/DetalhesClientes/detalhesClientes'
import Cobrancas from './Pages/Cobrancas/cobrancas'

import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

export default function Rotas() {
  function RotaProtegida({ redirecionamento }) {
    const token = sessionStorage.getItem('token')

    return token ? <Outlet /> : <Navigate to={redirecionamento} />
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/cadastro" element={<Cadastro />} />

      <Route element={<RotaProtegida redirecionamento={'/'} />}>
        <Route path="/home" element={<PaginaHome />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/detalhesCliente/:id" element={<DetalhesClientes />} />
        <Route path="/cobrancas" element={<Cobrancas />} />
      </Route>
    </Routes>
  )
}
