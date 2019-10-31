package com.cars.a2.repositories;

import com.cars.a2.models.Utility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilityRepository extends JpaRepository<Utility, Long> {
    Optional<Utility> findByName(String name);
}
