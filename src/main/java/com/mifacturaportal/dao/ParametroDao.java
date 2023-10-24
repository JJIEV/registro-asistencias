package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.Parametro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametroDao extends JpaRepository<Parametro, Integer> {

    @Query("SELECT p FROM Parametro p WHERE (:nombre is null or p.nombre = :nombre)")
    public Parametro findParametroByNombre(String nombre);

}
