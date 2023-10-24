import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  cargarRepresentacion,
  cargarRepresentacionAndXml,
  cargarRepresentacionPorNumeros,
  cargarRepresentacionRuc,
  cargarRepresentacionXmlNumeros,
  cargarRepresentacionXmlRuc,
  clearStateRepresentaciones,
 
} from "../../reducers/docs/electronicos/representacionSlice.js";
import { getCaptchaKey } from "../../reducers/config/captchaKeyFunction.js";
import img_help from "../prod/img/img_help.svg";
import Cookies from "universal-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { cargarConfiguracionConsulta } from "../../reducers/config/configSelected.js";
import imagenDefault from '../prod/img/login-bg.png';
import logoDefault from "../prod/img/logo-mifactura.png";


export const DescargarFac = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cdcValue, setCdcValue] = useState("");
  const [puntoExp, setPuntoExp] = useState("");
  const [establecimiento, setEstablecimiento] = useState("");
  const [numero, setnumero] = useState("");
  const [pin, setPin] = useState("");
  const [codigo, setCodigo] = useState("");
  const [toggleRUC, setToggleRUC] = useState(true);
  const [toggleCDC, setToggleCDC] = useState(false);
  const [toggleFactura, setToggleFactura] = useState(false);
  const [verified, setVerified] = useState(false);
  const recaptchaRef = useRef();
  const cookie = new Cookies();

  const configuracionNueva = useSelector((state) => {
    return state.configuracion.settingSelected;
  });

  const captchaKey = useSelector((state) => {
    return state.captcha.key;
  });

  const {isSuccess, isLoading, isError, message} = useSelector((state)=>{
    return state.representacion
  })

  const onVerXmlCDC = async () => {
    let obj = {
      cdcValue: cdcValue,
      pin: pin,
    };
    dispatch(cargarRepresentacionAndXml(obj));
  };
  const onVerXmlCodigoPin = () => {
    let obj = {
      codigo: codigo,
      pin: pin,
    };
 
    dispatch(cargarRepresentacionXmlRuc(obj));
    
  };
  const onVerXmlNumeros = () => {
    let obj = {
      pexp: puntoExp,
      est: establecimiento,
      num: numero,
      pin: pin,
    };
    dispatch(cargarRepresentacionXmlNumeros(obj));
  };
  const onVerKudeCDC = () => {
    let obj = {
      cdcValue: cdcValue,
      pin: pin,
    };
    dispatch(cargarRepresentacion(obj));
  };
  const onVerKuDECodigoPin = () => {
    let obj = {
      codigo: codigo,
      pin: pin,
    };
    dispatch(cargarRepresentacionRuc(obj));
  };
  const onVerKudeNumeros = () => {
    let obj = {
      pexp: puntoExp,
      est: establecimiento,
      num: numero,
      pin: pin,
    };
    dispatch(cargarRepresentacionPorNumeros(obj));
    // getKude(representacion.id);
  };

  const handleExpired = () => {
    // Reset the reCAPTCHA token
    //alert("reCAPTCHA token has expired. Please verify again.");
  };

  useEffect(() => {
    dispatch(getCaptchaKey());
    dispatch(cargarConfiguracionConsulta());
  }, []);



  return (
    <>
      <div className="consultaPage" style={configuracionNueva?.color2?{ backgroundColor: configuracionNueva?.color2 } : {backgroundColor: "#EDF2F9"}}>
        <div className="content-left">
          <img
            src={configuracionNueva?.imagen?"data:image/png;base64," + `${configuracionNueva?.imagen}`:imagenDefault}
            className="img-fluid"
            alt=""
          ></img>
        </div>

        <div  className="content-right">
          <div className="content-right__form">
            <div action="" className="tabsConsulta">
              <header>
                <img
                  src={configuracionNueva?.logo?"data:image/png;base64," + `${configuracionNueva?.logo}`:logoDefault}
                  className="img-fluid img-brand"
                  alt=""
                ></img>
              </header>
              <main>
                <h1> Consulta tu factura </h1>
                <div className="head-tabs">
                  <span className="txt"> Consultar por </span>
                  <ul className="nav nav-tabs" id="myTab0" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={"btn btn-tab active"}
                        style={
                          toggleRUC
                            ? {
                                color: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                                borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                              }
                            : { borderColor: "lightGray" }
                        }
                        id="ruc-tab"
                        data-mdb-toggle="tab"
                        data-mdb-target="#ruc"
                        type="button"
                        role="tab"
                        aria-controls="ruc"
                        aria-selected="true"
                        onClick={() => {
                          setToggleRUC(true),
                            setToggleCDC(false),
                            setToggleFactura(false),
                            setCdcValue(""),
                            setPin(""),
                            setPuntoExp(""),
                            setEstablecimiento(""),
                            setnumero(""),
                            dispatch(clearStateRepresentaciones());
                        }}
                      >
                        Código
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={"btn btn-tab"}
                        style={
                          toggleCDC
                            ? {
                                color: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                                borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                              }
                            : { borderColor: "lightGray" }
                        }
                        id="home-tab0"
                        data-mdb-toggle="tab"
                        data-mdb-target="#home0"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="false"
                        onClick={() => {
                          setToggleRUC(false),
                            setToggleCDC(true),
                            setToggleFactura(false),
                            setCodigo(""),
                            setPin(""),
                            setPuntoExp(""),
                            setEstablecimiento(""),
                            setnumero(""),
                            dispatch(clearStateRepresentaciones());
                        }}
                      >
                        CDC
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={"btn btn-tab"}
                        style={
                          toggleFactura
                            ? {
                                color: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                                borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                              }
                            : { borderColor: "lightGray" }
                        }
                        id="nrfactura-tab"
                        data-mdb-toggle="tab"
                        data-mdb-target="#nrfactura"
                        type="button"
                        role="tab"
                        aria-controls="nrofactura"
                        aria-selected="false"
                        onClick={() => {
                          setToggleRUC(false),
                            setToggleCDC(false),
                            setToggleFactura(true),
                            setCodigo(""),
                            setPin(""),
                            setCdcValue(""),
                            dispatch(clearStateRepresentaciones());
                        }}
                      >
                        Nº de Documento
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="ruc"
                    role="tabpanel"
                    aria-labelledby="ruc-tab"
                  >
                    <div className="form-tab">
                      <div className="form-group md-input">
                        <input
                          className="form-control md-form-control"
                          style={{
                            borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          required={true}
                          type="text"
                          value={codigo}
                          placeholder=" "
                          name="ruc"
                          onChange={({ target }) => {
                            setCodigo(target.value);
                          }}
                        ></input>
                        <label className="md-label">
                          {" "}
                          Código <span>*</span>
                        </label>
                      </div>
                      <div className="form-group md-input">
                        <input
                          className="form-control md-form-control"
                          style={{
                            borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          required={true}
                          type="text"
                          value={pin}
                          placeholder=" "
                          name="ruc"
                          onChange={({ target }) => {
                            setPin(target.value);
                          }}
                        ></input>
                        <label className="md-label">
                          {" "}
                          Pin <span>*</span>
                        </label>
                      </div>
                      <div className="actions">
                        
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerXmlCodigoPin}
                        >
                          {" "}
                          Ver factura XML{" "}
                        </button>
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerKuDECodigoPin}
                        >
                          {" "}
                          Ver factura KuDE{" "}
                        </button>
                      </div>
                    </div>

                    {/* <!-- Incluir codigo captcha dentro del div siguiente --> */}
                    {/* <div className="captcha-content">
                      <img src="" className="img-fluid" alt=""></img>
                    </div> */}
                  </div>
                  

                  <div
                    className="tab-pane fade"
                    id="home0"
                    role="tabpanel"
                    aria-labelledby="home-tab0"
                  >
                    <div className="form-tab">
                      <div className="form-group md-input">
                        <input
                          className="form-control md-form-control"
                          style={{
                            borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          required={true}
                          type="text"
                          value={cdcValue}
                          placeholder=" "
                          name="cdc"
                          onChange={({ target }) => {
                            setCdcValue(target.value);
                          }}
                        ></input>
                        <label className="md-label">
                          {" "}
                          CDC <span>*</span>
                        </label>
                      </div>
                      <div className="form-group md-input">
                        <input
                          className="form-control md-form-control"
                          style={{
                            borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          required={true}
                          type="text"
                          value={pin}
                          placeholder=" "
                          name="pin"
                          onChange={({ target }) => {
                            setPin(target.value);
                          }}
                        ></input>
                        <label className="md-label">
                          {" "}
                          Pin <span>*</span>
                        </label>
                      </div>
                      <div className="actions">
                        
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerXmlCDC}
                        >
                          {" "}
                          Ver factura XML{" "}
                        </button>
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerKudeCDC}
                        >
                          {" "}
                          Ver factura KuDE{" "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={"tab-pane fade"}
                    id="nrfactura"
                    role="tabpanel"
                    aria-labelledby="nrfactura-tab"
                  >
                    <div className="form-tab">
                      <div className="form-inline">
                        <div className="form-group md-input">
                          <input
                            className="form-control md-form-control"
                            required={true}
                            style={{
                              borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                            }}
                            type="text"
                            value={puntoExp}
                            placeholder=" "
                            onChange={({ target }) => {
                              setPuntoExp(target.value);
                            }}
                          ></input>
                          <label className="md-label"> Pto. Exp. </label>
                        </div>
                        <div className="form-group md-input">
                          <input
                            className="form-control md-form-control"
                            required={true}
                            style={{
                              borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                            }}
                            type="text"
                            value={establecimiento}
                            placeholder=" "
                            onChange={({ target }) => {
                              setEstablecimiento(target.value);
                            }}
                          ></input>
                          <label className="md-label"> Establecimiento </label>
                        </div>
                        <div className="form-group md-input">
                          <input
                            className="form-control md-form-control"
                            required={true}
                            style={{
                              borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                            }}
                            type="text"
                            value={numero}
                            placeholder=" "
                            onChange={({ target }) => {
                              setnumero(target.value);
                            }}
                          ></input>
                          <label className="md-label"> Número</label>
                        </div>
                      </div>
                      <div className="form-group md-input">
                        <input
                          className="form-control md-form-control"
                          style={{
                            borderColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          required={true}
                          type="text"
                          value={pin}
                          placeholder=" "
                          name="pin"
                          onChange={({ target }) => {
                            setPin(target.value);
                          }}
                        ></input>
                        <label className="md-label">
                          {" "}
                          Pin <span>*</span>
                        </label>
                      </div>
                      <div className="actions">
                        
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerXmlNumeros}
                        >
                          {" "}
                          Ver factura XML{" "}
                        </button>
                        <button
                          disabled={!verified}
                          className="btn btn-primary"
                          style={{
                            backgroundColor: configuracionNueva?.color1?`${configuracionNueva?.color1}`:"#1565D8",
                          }}
                          onClick={onVerKudeNumeros}
                        >
                          {" "}
                          Ver factura KuDE{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {verified ? (
                  <div>
                    Verificado <CheckCircleIcon />
                  </div>
                ) : (captchaKey?
                  <div className="captcha-content">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={captchaKey}
                      onChange={() => {
                        setVerified(true);
                      }}
                    />
                  </div> : ""
                )}
                {isError ? (
                    <div className="alerts" style={{ "marginBottom": "10px" }}>

                    <div className="alert alert-dismissible fade show alert-danger" role="alert" data-mdb-color="error">
      
                      <strong>Error al consultar el documento </strong>
      
                      <button type="button" className="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
      
                    </div>
      
                  </div>

                  ): ""}
                {toggleCDC && (
                  <div className="helper-content">
                    <span className="txt">
                      {" "}
                      El CDC se encuentra al final de su documento como en la
                      siguiente imagen:{" "}
                    </span>
                    <img src={img_help} className="img-fluid" alt=""></img>
                  </div>
                )}
                {toggleFactura && (
                  <div className="helper-content">
                    <span className="txt">
                      {" "}
                      Ingresar el número de documento (puede encontrar el número
                      con el siguiente formato):{" "}
                    </span>
                    <div className="fe"> Factura electrónica </div>
                    <div className="nr"> Nº: XXX - XXX - XXXXXXX </div>
                  </div>
                )}
              </main>
            </div>
          </div>

          <footer>
            <div className="poweredby">
              {" "}
              <span>
                {" "}
                Producto desarrollado por{" "}
                <a href="https://www.isaportal.com.py">ISA Paraguay </a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
