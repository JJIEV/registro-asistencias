import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import moment from "moment";
import "moment/locale/es";
import {
  clearStateElectronicos,
} from "../../reducers/docs/electronicos/electronicoSlice.js";
import {agregarEmpresa} from "../../reducers/users/cargarDatos.js"
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import logoDefault from "../prod/img/logo-mifactura.png";
import perfilEmptyDefault from "../prod/img/avatar.png";
import {
  clearStateEmpresa,
} from "../../reducers/users/cargarDatos";
import { onLogout } from "../../reducers/auth/slices/authSlice.js";
import ApartmentIcon from '@mui/icons-material/Apartment';
import {cargarPaginaFiltradaListaEmpresas} from "../../reducers/docs/empresas/actions.js"
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { cargarEmpresaById } from "../../reducers/users/empresaSlice.js";
import { cargarConfiguracionConsulta } from "../../reducers/config/configSelected.js";
import PersonIcon from '@mui/icons-material/Person';

export const Empresa = () => {

  const cookies = new Cookies();

  const dispatch = useDispatch();



  // const empresas = useSelector((state) => {
  //   return state.empresasPaginadas.listaEmpresasTotal;
  // });

  const { username, roles } = useSelector((state) => {
    return state.auth;
  });

  const [filasPorPagina, setFilasPorPagina] = useState(4);
  const [paginaActual, setPaginaActual] = useState(0);

  const [showFiltro, setShowFiltro] = useState(false);
  const handleShowFiltro = () => setShowFiltro(true);
  const handleCloseFiltro = () => setShowFiltro(false);

  const [nombreEmpresa, setNombreEmpresa] = useState('');


  const [ruc, setRuc] = useState('');

  const configuracionNueva = useSelector((state) => {
    return state.configuracion.settingSelected;
  });


  // const {empresas} = useSelector((state) => {
  //   return state.usuario.empresas;
  // });
  const empresas = useSelector((state) => {
    return state.usuario.empresas;
  });

  const {totalPaginasEmpresas, listaEmpresasTotal} = useSelector((state) => {
    return state.empresasPaginadas;
  });

  const mostrar = [4, 8, 12, 16];

  const handleChangeFilasPorPagina = (event) => {
    setFilasPorPagina(event.target.value);
    setPaginaActual(0);
  };
  const handleChangePagina = (event, value) => {
    setPaginaActual(value - 1);
  };

  useEffect(() => {
    dispatch(cargarConfiguracionConsulta())
    dispatch(
      cargarPaginaFiltradaListaEmpresas({
        page: paginaActual,
        size: filasPorPagina,
      })
    );
  }, [paginaActual, filasPorPagina]);

  const handleSubmit = () => {
    const filtro = {
      nombre: nombreEmpresa,
      ruc: ruc

    }
    dispatch(agregarEmpresa(filtro))
    .then(data => {
      handleCloseFiltro();
      dispatch(
        cargarPaginaFiltradaListaEmpresas({
          page: paginaActual,
          size: filasPorPagina,
        })
      );
    })
    .catch(error => {
      console.error('Ocurrió un error:', error);
    });
  };

  const onCerrarSesion = () => {
    dispatch(clearStateEmpresa()), dispatch(onLogout());
    dispatch(clearStateElectronicos());
    cookies.remove("token");
    cookies.remove("roles");
    cookies.remove("empresaId");
    cookies.remove("empresaRuc");
    cookies.remove("refreshToken");
  };
  const onSwitchEmpresa = (item) => {
    // dispatch(cargarConfiguracionEmpresa(item.configuracion.id));
    // dispatch(onSelectEmpresa(item));
    dispatch(cargarEmpresaById(item.id));
    // dispatch(cargarConfiguracionesEmpresa(item.id));

  };

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="leftside me-auto">
          <Link to={"/home"} className="brand">
            <img
              src={configuracionNueva?.logo?`data:image/png;base64,${configuracionNueva?.logo}`: logoDefault}
              className="img-fluid"
              alt="Logotipo empresa"
            ></img>
          </Link>
        </div>

        <ul className="navbar-nav">

        <Link to={"/empresa"}> <ApartmentIcon ></ApartmentIcon></Link>
        <Link to={"/usuario"}>
            {" "}
            <PersonIcon></PersonIcon>
          </Link>


          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle custom-nav"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="true"
            >
              <img
                src={configuracionNueva?.logo?"data:image/png;base64," + `${configuracionNueva?.logo}`: logoDefault}
                className="img-fluid img-perfil"
                alt="Foto de perfil"
              ></img>
              {username}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {Array.isArray(empresas) && empresas.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        onSwitchEmpresa(item);
                      }}
                      role="button"
                      href={null}
                    >
                      <img
                        src={item.configuracion?.logo?`data:image/png;base64,${item.configuracion?.logo}`: perfilEmptyDefault}
                        className="img-fluid img-perfil"
                        alt="Foto de perfil"
                      ></img>
                      {item.nombre}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to={"/"}
              className="nav-link nav-settings"
              role="button"
              onClick={onCerrarSesion}
            >
              {" "}
              <span className="material-icons-outlined"> logout </span>{" "}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="contentPage card">
        <section id="documentos">
          <div className="table-responsive">
          <button 
          style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}
          className="btn btn-lg btn-primary" onClick={handleShowFiltro}>Agregar empresa</button>
            <table
              className="table table-striped table-hover"
              id="dtBasicExample"
              cellSpacing="0"
              width="100%"
            >
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">RUC</th>
                
                </tr>
              </thead>
              <tbody>
              {Array.isArray(listaEmpresasTotal) && listaEmpresasTotal.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.ruc}</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <div id="paginador">
          <label>
            Mostrar
            <select
              value={filasPorPagina}
              onChange={handleChangeFilasPorPagina}
              className="form-control custom-select custom-cursor"
              id="maxRows"
              name="state"
            >
              {mostrar.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
              resultados
            </select>
          </label>

          <Stack spacing={2}>
            <Pagination
              count={totalPaginasEmpresas}
              shape="rounded"
              onChange={handleChangePagina}
              color="primary"
              page={paginaActual + 1}
            />
          </Stack>
        </div>
      </div>
      <Modal show={showFiltro} onHide={handleCloseFiltro}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form-filtros">
            <Row className="modal-row">
              <Form.Group className="form-group md-input">
              <Form.Control 
                type="text" 
                placeholder="Ingresa el nombre de empresa"
                value={nombreEmpresa}
                onChange={e => setNombreEmpresa(e.target.value)} 
              />
              </Form.Group>
              <Form.Group className="form-group md-input">
              <Form.Control 
                type="text" 
                placeholder="Ingresa el RUC"
                value={ruc}
                onChange={e => setRuc(e.target.value)} 
              />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFiltro}>
            Cerrar
          </Button>
          <Button 
          style={configuracionNueva?.color1?{ backgroundColor: `${configuracionNueva?.color1}` } : {backgroundColor: "#1565D8"}}
          variant="primary" onClick={handleSubmit}>
            Guardar empresa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  );
};
