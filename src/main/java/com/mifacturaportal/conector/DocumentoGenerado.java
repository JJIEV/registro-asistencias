//
// Este archivo ha sido generado por la arquitectura JavaTM para la implantación de la referencia de enlace (JAXB) XML v2.2.7 
// Visite <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Todas las modificaciones realizadas en este archivo se perderán si se vuelve a compilar el esquema de origen. 
// Generado el: 2022.07.21 a las 04:22:33 PM PYT 
//


package com.mifacturaportal.conector;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;



@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "documentoGenerado", propOrder = {
    "idDocumento",
    "estado",
    "tipoDocumento",
    "xml",
    "parametrosProcesamiento",
    "pdf"
})
public class DocumentoGenerado {

    @XmlElement(required = true)
    protected String idDocumento;
    @XmlElement(required = true)
    protected String estado;
    protected int tipoDocumento;
    @XmlElement(required = true)
    protected String xml;
    protected String parametrosProcesamiento;
    @XmlElement(required = true)
    protected String pdf;


    public String getIdDocumento() {
        return idDocumento;
    }


    public void setIdDocumento(String value) {
        this.idDocumento = value;
    }


    public String getEstado() {
        return estado;
    }


    public void setEstado(String value) {
        this.estado = value;
    }


    public int getTipoDocumento() {
        return tipoDocumento;
    }


    public void setTipoDocumento(int value) {
        this.tipoDocumento = value;
    }


    public String getXml() {
        return xml;
    }


    public void setXml(String value) {
        this.xml = value;
    }


    public String getParametrosProcesamiento() {
        return parametrosProcesamiento;
    }


    public void setParametrosProcesamiento(String value) {
        this.parametrosProcesamiento = value;
    }


    public String getPdf() {
        return pdf;
    }


    public void setPdf(String value) {
        this.pdf = value;
    }

}
