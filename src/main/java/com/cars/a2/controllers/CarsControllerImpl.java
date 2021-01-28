package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.CarsController;
import com.cars.a2.models.Car;
import com.cars.a2.services.CarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class CarsControllerImpl implements CarsController {

    private static final Logger logger = LoggerFactory.getLogger(CarsControllerImpl.class);

    private com.cars.a2.services.CarService carService;

    public CarsControllerImpl(CarService carService) {
        this.carService = carService;
    }


    @Override
    public ResponseEntity<Object> getAllCars(String isSold) {
        return carService.getAllCars(Boolean.parseBoolean(isSold));
    }

    @Override
    public ResponseEntity<Object> saveCar(Car car) {
        return carService.saveNewCar(car);
    }

    @Override
    public ResponseEntity<Object> getSingleCar(String filter, String filterType, String soldOrNot) {
        return carService.getSingleCar(filter, filterType, Boolean.parseBoolean(soldOrNot));
    }

    @Override
    public ResponseEntity<Object> getSingleCarById(long id) {
        return carService.getSingleCarById(id);
    }

    @Override
    public ResponseEntity<Object> updateCar(Car car) {
        return carService.updateCar(car);
    }

    @Override
    public ResponseEntity<Object> deleteCar(long id) {
        return carService.deleteCar(id);
    }

    @Override
    public ResponseEntity<Object> getNotSoldCarsId() {
        return carService.getListOfNotSoldCarsId();
    }
}
