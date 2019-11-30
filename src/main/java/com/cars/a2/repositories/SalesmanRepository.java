package com.cars.a2.repositories;

import com.cars.a2.models.Salesman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SalesmanRepository extends JpaRepository<Salesman, Long> {
    Optional<List<Salesman>> findByNameContaining(String name);
}
