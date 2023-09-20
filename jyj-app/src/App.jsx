import {Routes, Route, useLocation} from 'react-router-dom'
// import './App.css'

import Login from "./components/login/Login"
import Home from "./components/home/Home"
import Barra from "./components/nav/Navbar"
import Inventario from './components/inventario/Inventario'
import Registro from './components/clientes/Registro'
import Facturacion from './components/Facturas/Crear Factura/Facturacion'
import VerFacturas from './components/Facturas/ver facturas/index'


function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname !== '/login' && <Barra/>}
     <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="inventario" element={<Inventario/>}></Route> 
        <Route path= "clientes" element={<Registro/>}></Route>
        <Route path="facturacion" element={<Facturacion/>}></Route>
        <Route path='ver-facturas' element={ <VerFacturas/> }></Route>
     </Routes>
    </>
  )
}

export default App
