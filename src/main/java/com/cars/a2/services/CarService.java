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
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private static final Logger logger = LoggerFactory.getLogger(CarService.class);

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

    public ResponseEntity<Object> getAllCars(Boolean isSold, int limit, int offset) {
        try {
            if (!isSold) {
                Optional<List<Car>> cars = carRepository.findBySoldOrderByIdDesc(isSold);
                Optional<List<Car>> pagedCars = carRepository.findBySoldOrderByIdDesc(isSold, createPageRequest(limit, offset));
                if (cars.isPresent() && pagedCars.isPresent()) {
                    CarsAndQuantity carsAndQuantity = new CarsAndQuantity(cars.get().size(), pagedCars.get());
                    return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                }
                return new ResponseEntity<>(cars, HttpStatus.OK);
            } else {
                Optional<List<Car>> cars = carRepository.findBySoldOrderByDateOfLeavingDesc(isSold);
                Optional<List<Car>> pagedCars = carRepository.findBySoldOrderByDateOfLeavingDesc(isSold, createPageRequest(limit, offset));
                if (cars.isPresent() && pagedCars.isPresent()) {
                    CarsAndQuantity carsAndQuantity = new CarsAndQuantity(cars.get().size(), pagedCars.get());
                    return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                }
            }
            return null;
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get all cars at the moment!");
        }
    }

    public ResponseEntity<Object> getSingleCarById(long id) {
        try {
            Car car= carRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Car is not found by carId!"));;
            return new ResponseEntity<>(car, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new ConnectionTemporarilyLostException("Couldn't get the car at the moment!");
        }
    }

    public ResponseEntity<Object> getFilteredCars(String filter, String filterType, Boolean isSold, int limit, int offset) {
        switch (filterType) {
            case "plateNumber":
                if (isSold) {
                    try {
                        Optional<List<Car>> soldCarsByPlateNumber = carRepository.findByPlateNumberAndSoldTrue(filter);
                        Optional<List<Car>> pagedSoldCarsByPlateNumber = carRepository.findByPlateNumberAndSoldTrue(filter, createPageRequest(limit, offset));
                        if (soldCarsByPlateNumber.isPresent() && pagedSoldCarsByPlateNumber.isPresent()) {
                            CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCarsByPlateNumber.get().size(), pagedSoldCarsByPlateNumber.get());
                            return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                        } else {
                            throw new EntityNotFoundException("Cars are not found by plate number!");
                        }
                    } catch (Exception e) {
                        throw new EntityNotFoundException("Cars are not found by plate number!");
                    }
                } else {
                    try {
                        Optional<List<Car>> activeCarsByPlateNumber = carRepository.findByPlateNumberAndSoldFalse(filter);
                        Optional<List<Car>> pagedActiveCarsByPlateNumber = carRepository.findByPlateNumberAndSoldFalse(filter, createPageRequest(limit, offset));
                        if (activeCarsByPlateNumber.isPresent() && pagedActiveCarsByPlateNumber.isPresent()) {
                            CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCarsByPlateNumber.get().size(), pagedActiveCarsByPlateNumber.get());
                            return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                        } else {
                            throw new EntityNotFoundException("Cars are not found by plate number!");
                        }
                    } catch (Exception e) {
                        throw new EntityNotFoundException("Cars are not found by plate number!");
                    }
                }
            case "type":
                if (isSold) {
                    List<Car> soldCarsByType = carRepository.findByTypeContainingAndSoldTrue(filter).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    List<Car> pagedSoldCarsByType = carRepository.findByTypeContainingAndSoldTrue(filter, createPageRequest(limit, offset)).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCarsByType.size(), pagedSoldCarsByType);
                    return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                } else {
                    List<Car> activeCarsByType = carRepository.findByTypeContainingAndSoldFalse(filter).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    List<Car> pagedActiveCarsByType = carRepository.findByTypeContainingAndSoldFalse(filter, createPageRequest(limit, offset)).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCarsByType.size(), pagedActiveCarsByType);
                    return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                }
            case "name":
                if (isSold) {
                    Optional<List<Car>> soldCar = carRepository.findByNameContainingAndSoldTrue(filter);
                    Optional<List<Car>> pagedSoldCar = carRepository.findByNameContainingAndSoldTrue(filter, createPageRequest(limit, offset));
                    if (soldCar.isPresent() && pagedSoldCar.isPresent()) {
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(soldCar.get().size(), pagedSoldCar.get());
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } else {
                        throw new EntityNotFoundException("Car is not found by name!");
                    }
                } else {
                    Optional<List<Car>> activeCar = carRepository.findByNameContainingAndSoldFalse(filter);
                    Optional<List<Car>> pagedActiveCar = carRepository.findByNameContainingAndSoldFalse(filter, createPageRequest(limit, offset));
                    if (activeCar.isPresent() && pagedActiveCar.isPresent()) {
                        CarsAndQuantity carsAndQuantity = new CarsAndQuantity(activeCar.get().size(), pagedActiveCar.get());
                        return new ResponseEntity<>(carsAndQuantity, HttpStatus.OK);
                    } else {
                        throw new EntityNotFoundException("Car is not found by name!");
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
