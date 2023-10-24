//package com.mifacturaportal.conector;
//
//import interfase.mifactura.mifacturahub.model.Conector;
//import interfase.mifactura.mifacturahub.model.Documento;
//import interfase.mifactura.mifacturahub.repository.ConnectorRepository;
//import interfase.mifactura.mifacturahub.repository.DocumentoRepository;
//import interfase.mifactura.mifacturahub.ws.conectorschema.*;
//import interfase.mifactura.mifacturahub.ws.notificacionSchema.Notificacion;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
//
//import java.nio.charset.StandardCharsets;
//import java.util.Date;
//import java.util.List;
//
//public class ConectorClient extends WebServiceGatewaySupport{
//
//	@Autowired
//	private DocumentoRepository documentRepository;
//	@Autowired
//	private ConnectorRepository connectorRepository;
//
//	public GenerarDEResponse generarDocumento(String wsdlUrl) {
//
//		GenerarDERequest request = new GenerarDERequest();
//		request.setCantidadDocumentos(5);
//
//		GenerarDEResponse responseList = (GenerarDEResponse) getWebServiceTemplate()
//				.marshalSendAndReceive(wsdlUrl, request);
//
//		System.err.println("Se obtienen " + responseList.getDocumento().size() + " documentos");
//
//		for(DocumentoGenerado documentoGenerado :responseList.getDocumento()){
//			String estado = documentoGenerado.getEstado();
//			String idDocumento = documentoGenerado.getIdDocumento();
//			int tipoDocumento = documentoGenerado.getTipoDocumento();
//			Documento documento;
//
//
//			if(estado.equals(EstadoDocumento.GENERADO.toString())) {
//
//				documento = documentRepository.findByIdDocumento(idDocumento);
//				Conector conector = connectorRepository.getConnectorByUrl(wsdlUrl);
//
//				if(tipoDocumento > 0 && tipoDocumento <= Documento.TiposDocumentos.size()) {
//					if (documento == null) documento = new Documento();
//
//					documento.setTipo(tipoDocumento);
//					documento.setEstado("PENDIENTE");
//					documento.setEstadoNotificacion(null);
//					documento.setPdf(null);
//					documento.setCdc(null);
//					documento.setObservacion(null);
//					documento.setFechaRecepcion(new Date());
//					documento.setDescripcionDocumento(Documento.TiposDocumentos.get(tipoDocumento - 1));
//					documento.setIdDocumento(documentoGenerado.getIdDocumento());
//					documento.setXml(documentoGenerado.getXml());
//					documento.setConector(conector);
//					documentRepository.save(documento);
//				}
//
//			}
//		}
//
//
//		return responseList;
//	}
//
//	public GenerarDEResponse generarDocumento(String wsdlUrl, int quantity) {
//		GenerarDERequest request = new GenerarDERequest();
//		request.setCantidadDocumentos(quantity);
//
//		GenerarDEResponse response = (GenerarDEResponse) getWebServiceTemplate()
//				.marshalSendAndReceive(wsdlUrl, request);
//
//		System.err.println("Se obtienen " + response.getDocumento().size() + " documentos");
//
//		for(DocumentoGenerado documentoGenerado :response.getDocumento()) {
//			String estado = documentoGenerado.getEstado();
//			String idDocumento = documentoGenerado.getIdDocumento();
//			int tipoDocumento = documentoGenerado.getTipoDocumento();
//			Documento documento;
//
//			if(estado.equals(EstadoDocumento.GENERADO.toString())) {
//
//				documento = documentRepository.findByIdDocumento(idDocumento);
//				Conector conector = connectorRepository.getConnectorByUrl(wsdlUrl);
//
//				if(tipoDocumento > 0 && tipoDocumento <= Documento.TiposDocumentos.size()) {
//					if (documento == null) documento = new Documento();
//
//					documento.setTipo(tipoDocumento);
//					documento.setEstado("PENDIENTE");
//					documento.setEstadoNotificacion(null);
//					documento.setPdf(null);
//					documento.setCdc(null);
//					documento.setObservacion(null);
//					documento.setFechaRecepcion(new Date());
//					documento.setDescripcionDocumento(Documento.TiposDocumentos.get(tipoDocumento - 1));
//					documento.setIdDocumento(documentoGenerado.getIdDocumento());
//					documento.setXml(documentoGenerado.getXml());
//					documento.setConector(conector);
//					documento.setParametrosProcesamiento(documentoGenerado.getParametrosProcesamiento());
//					documentRepository.save(documento);
//				}
//
//			}
//		}
//
//		return response;
//	}
//
//	public ActualizarDEResponse notificarDocumento(String url, List<Notificacion> documentos) {
//		ActualizarDERequest request = new ActualizarDERequest();
//
//		for(Notificacion documento: documentos) {
//			ActualizarDE actualizarDE = new ActualizarDE();
//			actualizarDE.setCdc(documento.getCdc());
//			actualizarDE.setEstado(documento.getEstado());
//			request.getActualizarDE().add(actualizarDE);
//		}
//
//		ActualizarDEResponse response = (ActualizarDEResponse) getWebServiceTemplate()
//				.marshalSendAndReceive(url, request);
//		return response;
//	}
//
//	public ActualizarDEResponse actualizarCDC(String url, List<Documento> documentos) {
//		ActualizarDERequest request = new ActualizarDERequest();
//
//		for(Documento documento: documentos) {
//			ActualizarDE actualizarDE = new ActualizarDE();
//			actualizarDE.setIdDocumento(documento.getIdDocumento());
//			actualizarDE.setCdc(documento.getCdc());
//			actualizarDE.setPdf(documento.getPdf());
//			actualizarDE.setEstado("PROCESADO");
//			String xmlFirmado = new String(documento.getXml_firmado(), StandardCharsets.UTF_8);
//			actualizarDE.setXmlFirmado(xmlFirmado);
//			request.getActualizarDE().add(actualizarDE);
//		}
//
//		ActualizarDEResponse response = (ActualizarDEResponse) getWebServiceTemplate()
//				.marshalSendAndReceive(url, request);
//		return response;
//	}
//}
