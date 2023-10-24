package com.mifacturaportal.conector;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "documento"
})
@XmlRootElement(name = "generarDEResponse")
public class GenerarDEResponse {

    protected List<DocumentoGenerado> documento;


    public List<DocumentoGenerado> getDocumento() {
        if (documento == null) {
            documento = new ArrayList<DocumentoGenerado>();
        }
        return this.documento;
    }

}
