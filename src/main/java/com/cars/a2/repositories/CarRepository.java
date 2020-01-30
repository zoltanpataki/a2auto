package com.cars.a2.repositories;

import com.cars.a2.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<List<Car>> findBySoldOrderByIdAsc(Boolean sold);
    Optional<Car> findByPlateNumberAndSoldFalse(String plateNumber);
    Optional<List<Car>> findByTypeContainingAndSoldFalse(String type);
    Optional<List<Car>> findByNameContainingAndSoldFalse(String name);
    Optional<Car> findById(Long id);
}
