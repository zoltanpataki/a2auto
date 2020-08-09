package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Car;
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
            throw new EntityFailedToSaveException("New car couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getAllCars() {
        try {
            Optional<List<Car>> cars = carRepository.findBySoldOrderByIdAsc(false);
            return new ResponseEntity<>(cars, HttpStatus.OK);
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

    public ResponseEntity<Object> getSingleCar(String filter, String filterType, Boolean soldOrNot) {
        switch (filterType) {
            case "plateNumber":
                if (soldOrNot) {
                    try {
                        Optional<Car> soldCar = carRepository.findByPlateNumberAndSoldTrue(filter);
                        if (!soldCar.isPresent()) {
                            throw new EntityNotFoundException("Car is not found by plate number!");
                        } else {
                            return new ResponseEntity<>(soldCar, HttpStatus.OK);
                        }
                    } catch (Exception e) {
                        throw new EntityNotFoundException("Car is not found by plate number!");
                    }
                } else {
                    try {
                        Optional<Car> activeCar = carRepository.findByPlateNumberAndSoldFalse(filter);
                        if (!activeCar.isPresent()) {
                            throw new EntityNotFoundException("Car is not found by plate number!");
                        } else {
                            return new ResponseEntity<>(activeCar, HttpStatus.OK);
                        }
                    } catch (Exception e) {
                        throw new EntityNotFoundException("Car is not found by plate number!");
                    }
                }
            case "type":
                if (soldOrNot) {
                    List<Car> soldCarsByType = carRepository.findByTypeContainingAndSoldTrue(filter, createPageRequest()).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    return new ResponseEntity<>(soldCarsByType, HttpStatus.OK);
                } else {
                    List<Car> activeCarsByType = carRepository.findByTypeContainingAndSoldFalse(filter).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                    return new ResponseEntity<>(activeCarsByType, HttpStatus.OK);
                }
            case "name":
                if (soldOrNot) {
                    Optional<List<Car>> soldCar = carRepository.findByNameContainingAndSoldTrue(filter, createPageRequest());
                    if (!soldCar.isPresent()) {
                        throw new EntityNotFoundException("Car is not found by name!");
                    } else {
                        return new ResponseEntity<>(soldCar, HttpStatus.OK);
                    }
                } else {
                    Optional<List<Car>> activeCar = carRepository.findByNameContainingAndSoldFalse(filter);
                    if (!activeCar.isPresent()) {
                        throw new EntityNotFoundException("Car is not found by name!");
                    } else {
                        return new ResponseEntity<>(activeCar, HttpStatus.OK);
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

    private OffsetBasedPageRequest createPageRequest() {
        return new OffsetBasedPageRequest(50, 0);
    }
}
