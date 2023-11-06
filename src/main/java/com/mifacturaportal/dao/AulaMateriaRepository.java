package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.AulaMateria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AulaMateriaRepository extends JpaRepository<AulaMateria, Long> {

//    @Query("SELECT am FROM AulaMateria am WHERE :aulaId is null or am.aula.id = :aulaId AND :docenteId is null or am.docente = :docenteId")
//    public AulaMateria findAulaMateriaByAulaIdAndDocenteId(int aulaId, Long docenteId);

}
