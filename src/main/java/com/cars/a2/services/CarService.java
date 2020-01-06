package com.cars.a2.services;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Car;
import com.cars.a2.repositories.CarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
            carRepository.save(car);
            return new ResponseEntity<>(car, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("New car couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getAllCars() {
        try {
            List<Car> cars= carRepository.findAll();
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

    public ResponseEntity<Object> getSingleCar(String filter, String filterType) {
        switch (filterType) {
            case "plateNumber":
                try {
                    Optional<Car> car = carRepository.findByPlateNumberAndSoldFalse(filter);
                    return new ResponseEntity<>(car, HttpStatus.OK);
                } catch (Exception e) {
                    throw new EntityNotFoundException("Car is not found by plate number!");
                }
            case "type":
                System.out.println(filter);
                List<Car> carsByType = carRepository.findByTypeContainingAndSoldFalse(filter).orElseThrow(() -> new EntityNotFoundException("Car is not found by type!"));
                return new ResponseEntity<>(carsByType, HttpStatus.OK);
            case "name":
                Optional<List<Car>> car = carRepository.findByNameContainingAndSoldFalse(filter);
                if (!car.isPresent()) {
                    throw new EntityNotFoundException("Car is not found by name!");
                } else {
                    return new ResponseEntity<>(car, HttpStatus.OK);
                }
        }
        return null;
    }

    public ResponseEntity<Object> updateCar(Car car) {
        try {
            carRepository.save(car);
            return new ResponseEntity<>(car, HttpStatus.OK);
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
}
