package com.cars.a2.repositories;

import com.cars.a2.models.ZipCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ZipCodeRepository extends JpaRepository<ZipCode, Long> {
    Optional<ZipCode> findByCode(String zipCode);
}
