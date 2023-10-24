import {Route,Routes} from 'react-router-dom'
import {ProtectedRoutes} from '../routes'
import {MiFacturaRutas} from '../mi-factura/routes/MiFacturaRutas.jsx'
import { Login } from '../mi-factura/pages'
import { DescargarFac } from '../mi-factura/pages/DescargarFac.jsx'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/FACTURA' element={<DescargarFac />} />
        {/* <Route path='*' element={<Navigate to="/"/>} /> */}
        <Route path='/*' element={
          <ProtectedRoutes>
            <MiFacturaRutas />
          </ProtectedRoutes>
        }/>
      </Routes>
    </>
  )
}
