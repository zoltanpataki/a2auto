package com.cars.a2.repositories;

import com.cars.a2.models.Car;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    //all active or sold car repository calls
    Optional<List<Car>> findBySoldOrderByIdDesc(Boolean sold);
    Optional<List<Car>> findBySoldOrderByIdDesc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByDateOfLeavingDesc(Boolean sold);
    Optional<List<Car>> findBySoldOrderByDateOfLeavingDesc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByTypeAsc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByTypeDesc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByNameAsc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByNameDesc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByPlateNumberAsc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByPlateNumberDesc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByNameOfBuyerAsc(Boolean sold, Pageable pageRequest);
    Optional<List<Car>> findBySoldOrderByNameOfBuyerDesc(Boolean sold, Pageable pageRequest);
    //all plate number car repository calls
    Optional<List<Car>> findByPlateNumberAndSoldFalse(String plateNumber);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByIdDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldFalseOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrue(String plateNumber);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByDateOfLeavingDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByPlateNumberAndSoldTrueOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    //all type car repository calls
    Optional<List<Car>> findByTypeContainingAndSoldFalse(String type);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByIdDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldFalseOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrue(String type);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByDateOfLeavingDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByTypeContainingAndSoldTrueOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    //all name car repository calls
    Optional<List<Car>> findByNameContainingAndSoldFalse(String name);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByIdDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldFalseOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrue(String name);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByDateOfLeavingDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByTypeAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByTypeDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByNameAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByNameDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByPlateNumberAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByPlateNumberDesc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByNameOfBuyerAsc(String plateNumber, Pageable pageRequest);
    Optional<List<Car>> findByNameContainingAndSoldTrueOrderByNameOfBuyerDesc(String plateNumber, Pageable pageRequest);
    Optional<Car> findById(Long id);
}
