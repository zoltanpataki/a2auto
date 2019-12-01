package com.cars.a2.repositories;

import com.cars.a2.models.Witness;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WitnessRepository extends JpaRepository<Witness, Long> {
    Optional<List<Witness>> findByNameContaining(String name);
}
