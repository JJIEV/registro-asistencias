import { Route, Routes } from "react-router-dom"
import { Home } from "../pages"
import { Configuracion } from "../pages/Configuracion.jsx"
import { Firma } from "../pages/Firma.jsx"
import { KuDE } from "../pages/KuDE.jsx"
import { AdminRoutes } from "./AdminRoutes.jsx"
import {Empresa} from "../pages/Empresa"
import { Usuario } from "../pages/Usuario"
import { AsistenciaPrimeroBTI } from "../pages/AsistenciaPrimeroBTI"
import { Alumnos } from "../pages/Alumnos"
import {  Justificacion} from '../pages/Justificacion'

export const MiFacturaRutas = () => {
  return (
    <>
      <Routes>
        <Route path='/*' element={
          <AdminRoutes>
            <Routes>
              <Route path='/configuracion' element={<Configuracion />} />
            </Routes>
          </AdminRoutes>
        } />
        <Route path='/home' element={<Home />}/>
        <Route path="/empresa" element={<Empresa/>}></Route>
        <Route path='/alumno' element={<Alumnos />}></Route>
        <Route path="/asistenciaPrimeroBti" element={<AsistenciaPrimeroBTI/>}></Route>
        <Route path="/usuario" element={<Usuario/>}></Route>
        <Route path="/reportes" element={<Justificacion/>}></Route>
        <Route path='/docxml' element={<Firma />}>
        
        
          <Route path=":tipo/:id" element={<Firma />} />
        </Route>
        <Route path='/kude' element={<KuDE />}>
          <Route path=":id" element={<KuDE />} />
        </Route>
      </Routes>
    </>
  )
}
