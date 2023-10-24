import "./init"
import {AppRouter} from '../src/routes'
import { HashRouter} from "react-router-dom"
export const App = () => {
  return (
    <>
      <HashRouter>
        <AppRouter/>
      </HashRouter>
    </>
  )
}
