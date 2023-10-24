package com.mifacturaportal.servicio;

import com.mifacturaportal.dao.AsistenciaRepository;
import com.mifacturaportal.domain.registro.Asistencia;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.LockModeType;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Transactional
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public byte[] generarAsistenciasPdfService(Integer aulaId, Integer especialidadId) throws JRException, IOException {
        // 1. Obtener los datos de asistencia desde el repositorio
        Pageable pageable = PageRequest.of(0, 100); // Asumiendo que quieres los primeros 50 registros, puedes ajustar esto
        Page<Asistencia> asistencias = asistenciaRepository.findAsistenciaByAulaIdAndEspecialidadId(aulaId, especialidadId, pageable);

        System.out.println("Asistencias: " + asistencias);

        // 2. Preparación de la plantilla JRXML
        InputStream jasperStream = this.getClass().getResourceAsStream("/PlantillaAsistencias.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jasperStream);

        // 3. Convertir la página de asistencias a una fuente de datos para Jasper
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(asistencias.getContent());

        // 4. Preparar los parámetros para el informe
        Map<String, Object> params = new HashMap<>();
        params.put("DataSourceParam", dataSource);
        // ... puedes añadir más parámetros si tu plantilla .jrxml lo requiere

        // 5. Generar el PDF
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);

        byte[] pdfData = JasperExportManager.exportReportToPdf(jasperPrint);

        // 6. Devolver el PDF como array de bytes
        return pdfData;
    }

}
