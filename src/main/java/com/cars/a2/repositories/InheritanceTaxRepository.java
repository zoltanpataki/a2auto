package com.cars.a2.repositories;

import com.cars.a2.models.InheritanceTax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InheritanceTaxRepository extends JpaRepository<InheritanceTax, Long> {
    Optional<InheritanceTax> findByKW(String kW);
}
