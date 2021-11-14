package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Car;
import com.cars.a2.models.CarsAndQuantity;
import com.cars.a2.repositories.CarRepository;
import com.cars.a2.utility.OffsetBasedPageRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {

    private static final Logger logger = LoggerFactory.getLogger(CarService.class);
    private static final Boolean IS_SOLD_FALSE = false;
    private static final Boolean IS_SOLD_TRUE = true;

    public CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public ResponseEntity<Object> saveNewCar(Car car) {
        try {
            Car newCar = carRepository.saveAndFlush(car);
            return new ResponseEntity<>(newCar, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            if ("DataIntegrityViolationException".equals(e.getClass().getSimpleName())) {
                throw new EntityFailedToSaveException("Duplication");
            } else {
                throw new EntityFailedToSaveException("New car couldn't be saved!");
            }
        }
    }

    public ResponseEntity<Object> getAllCars(
            Boolean isSold,
            int limit,
            int offset,
            String orderBy,
            String orderDirection
    ) {
        try {
            if (!isSold) {
                List<Car> cars = carRepository
                        .findBySoldOrderByIdDesc(IS_SOLD_FALSE)
                        .orElseThrow(() -> new EntityNotFoundException("Cars are not found order by id!"));
                List<Car> pagedCars;
                if (orderBy == null) {
                    pagedCars = carRepository
                            .findBySoldOrderByIdDesc(IS_SOLD_FALSE, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found order by id!"));
                    System.out.println(pagedCars);
                } else {
                    pagedCars = getPagedCars(IS_SOLD_FALSE, orderBy, orderDirection, limit, offset);
                }
                CarsAndQuantity carsAndQuantity = new CarsAndQuantity(cars.size(), pagedCars);
                return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
            } else {
                List<Car> cars = carRepository
                        .findBySoldOrderByDateOfLeavingDesc(IS_SOLD_TRUE)
                        .orElseThrow(() -> new EntityNotFoundException("Sold Cars are not found order by date of leaving!"));
                List<Car> pagedCars;
                if (orderBy == null) {
                    pagedCars = carRepository
                            .findBySoldOrderByDateOfLeavingDesc(IS_SOLD_TRUE, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Sold Paged cars are not found order by date of leaving!"));
                } else {
                    pagedCars = getPagedCars(IS_SOLD_TRUE, orderBy, orderDirection, limit, offset);
                }
                CarsAndQuantity carsAndQuantity = new CarsAndQuantity(cars.size(), pagedCars);
                return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
        }
    }

    private List<Car> getPagedCars(Boolean isSold, String orderBy, String orderDirection, int limit, int offset) {
        if ("type".equals(orderBy)) {
            return "up".equals(orderDirection) ?
                    carRepository
                            .findBySoldOrderByTypeAsc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in asc order by type!")) :
                    carRepository
                            .findBySoldOrderByTypeDesc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in desc order by type!"));
        }
        if ("name".equals(orderBy)) {
            return "up".equals(orderDirection) ?
                    carRepository
                            .findBySoldOrderByNameAsc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in asc order by name!")) :
                    carRepository
                            .findBySoldOrderByNameDesc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in desc order by name!"));
        }
        if ("plateNumber".equals(orderBy)) {
            return "up".equals(orderDirection) ?
                    carRepository
                            .findBySoldOrderByPlateNumberAsc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in asc order by plate number!")) :
                    carRepository
                            .findBySoldOrderByPlateNumberDesc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in desc order by plate number!"));
        }
        if ("buyer".equals(orderBy)) {
            return "up".equals(orderDirection) ?
                    carRepository
                            .findBySoldOrderByNameOfBuyerAsc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in asc order by buyer!")) :
                    carRepository
                            .findBySoldOrderByNameOfBuyerDesc(isSold, createPageRequest(limit, offset))
                            .orElseThrow(() -> new EntityNotFoundException("Paged cars are not found in desc order by buyer!"));
        }
        return null;
    }

    public ResponseEntity<Object> getSingleCarById(long id) {
        try {
            Car car= carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Car is not found by carId!"));
            return new ResponseEntity<>(car, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get the car at the moment!");
        }
    }

    public ResponseEntity<Object> getFilteredCars(
            String filter,
            String filterType,
            Boolean isSold,
            int limit,
            int offset,
            String orderBy,
            String orderDirection
    ) {
        switch (filterType) {
            case "plateNumber":
                if (isSold) {
                    try {
                        List<Car> soldCarsByPlateNumber = carRepository
                                .findByPlateNumberAndSoldTrue(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Sold cars are not found by plate number!"));
                        List<Car> pagedSoldCarsByPlateNumber = new ArrayList<>();
                        if (orderBy == null) {
                            pagedSoldCarsByPlateNumber = carRepository
                                    .findByPlateNumberAndSoldTrueOrderByDateOfLeavingDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by date of leaving!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedSoldCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by type in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedSoldCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold Paged cars are not found by plate number order by name in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedSoldCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by plate number in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedSoldCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by buyer in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldTrueOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by plate number order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCarsByPlateNumber.size(), pagedSoldCarsByPlateNumber);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }
                } else {
                    try {
                        List<Car> activeCarsByPlateNumber = carRepository
                                .findByPlateNumberAndSoldFalse(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Active cars are not found by plate number!"));
                        List<Car> pagedActiveCarsByPlateNumber = new ArrayList<>();
                        if (orderBy == null) {
                            pagedActiveCarsByPlateNumber = carRepository
                                    .findByPlateNumberAndSoldFalseOrderByIdDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by id!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedActiveCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by type in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedActiveCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by name in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedActiveCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by plate number in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedActiveCarsByPlateNumber = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by buyer in asc!")) :
                                    carRepository
                                            .findByPlateNumberAndSoldFalseOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by plate number order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCarsByPlateNumber.size(), pagedActiveCarsByPlateNumber);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }
                }
            case "type":
                if (isSold) {
                    try {
                        List<Car> soldCarsByType = carRepository
                                .findByTypeContainingAndSoldTrue(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Sold car is not found by type!"));
                        List<Car> pagedSoldCarsByType = new ArrayList<>();
                        if (orderBy == null) {
                            pagedSoldCarsByType = carRepository
                                    .findByTypeContainingAndSoldTrueOrderByDateOfLeavingDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by date of leaving!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedSoldCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by type in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedSoldCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold Paged cars are not found by type order by name in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedSoldCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by plate number in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedSoldCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by buyer in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldTrueOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by type order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCarsByType.size(), pagedSoldCarsByType);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }

                } else {
                    try {
                        List<Car> activeCarsByType = carRepository
                                .findByTypeContainingAndSoldFalse(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Active car is not found by type!"));
                        List<Car> pagedActiveCarsByType = new ArrayList<>();
                        if (orderBy == null) {
                            pagedActiveCarsByType = carRepository
                                    .findByTypeContainingAndSoldFalseOrderByIdDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by id!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedActiveCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by type in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedActiveCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by name in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedActiveCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by plate number in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedActiveCarsByType = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by buyer in asc!")) :
                                    carRepository
                                            .findByTypeContainingAndSoldFalseOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by type order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCarsByType.size(), pagedActiveCarsByType);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }

                }
            case "name":
                if (isSold) {
                    try {
                        List<Car> soldCarsByName = carRepository
                                .findByNameContainingAndSoldTrue(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Sold car is not found by name!"));
                        List<Car> pagedSoldCarsByName = new ArrayList<>();
                        if (orderBy == null) {
                            pagedSoldCarsByName = carRepository
                                    .findByNameContainingAndSoldTrueOrderByDateOfLeavingDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by date of leaving!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedSoldCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by type in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedSoldCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold Paged cars are not found by name order by name in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedSoldCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by plate number in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedSoldCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by buyer in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldTrueOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Sold paged cars are not found by name order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCarsByName.size(), pagedSoldCarsByName);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }
                } else {
                    try {
                        List<Car> activeCarsByName = carRepository
                                .findByNameContainingAndSoldFalse(filter)
                                .orElseThrow(() -> new EntityNotFoundException("Active car is not found by name!"));
                        List<Car> pagedActiveCarsByName = new ArrayList<>();
                        if (orderBy == null) {
                            pagedActiveCarsByName = carRepository
                                    .findByNameContainingAndSoldFalseOrderByIdDesc(filter, createPageRequest(limit, offset))
                                    .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by id!"));
                        }
                        if ("type".equals(orderBy)) {
                            pagedActiveCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByTypeAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by type in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByTypeDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by type in desc!"));
                        }
                        if ("name".equals(orderBy)) {
                            pagedActiveCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByNameAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by name in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByNameDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by name in desc!"));
                        }
                        if ("plateNumber".equals(orderBy)) {
                            pagedActiveCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByPlateNumberAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by plate number in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByPlateNumberDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by plate number in desc!"));
                        }
                        if ("buyer".equals(orderBy)) {
                            pagedActiveCarsByName = "up".equals(orderDirection) ?
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByNameOfBuyerAsc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by buyer in asc!")) :
                                    carRepository
                                            .findByNameContainingAndSoldFalseOrderByNameOfBuyerDesc(filter, createPageRequest(limit, offset))
                                            .orElseThrow(() -> new EntityNotFoundException("Active paged cars are not found by name order by buyer in desc!"));
                        }
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCarsByName.size(), pagedActiveCarsByName);
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } catch (Exception e) {
                        logger.info(e.getMessage());
                        throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
                    }
                }
        }
        return null;
    }

    public ResponseEntity<Object> updateCar(Car car) {
        try {
            Car updatedCar = carRepository.saveAndFlush(car);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Car couldn't be updated!");
        }
    }

    public ResponseEntity<Object> deleteCar(long id) {
        try {
            carRepository.deleteById(id);
            return new ResponseEntity<>("Car is deleted!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("Car couldn't be deleted!");
        }
    }

    private OffsetBasedPageRequest createPageRequest(int limit, int offset) {
        return new OffsetBasedPageRequest(limit, offset);
    }
}
