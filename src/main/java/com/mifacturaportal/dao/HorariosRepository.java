package com.mifacturaportal.dao;

import com.mifacturaportal.domain.registro.Horarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorariosRepository extends JpaRepository<Horarios, Integer> {
}
