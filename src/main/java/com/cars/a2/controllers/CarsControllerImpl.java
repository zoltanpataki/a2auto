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
    public ResponseEntity<Object> getAllCars() {
        return carService.getAllCars();
    }

    @Override
    public ResponseEntity<Object> saveCar(Car car) {
        return carService.saveNewCar(car);
    }

    @Override
    public ResponseEntity<Object> getSingleCar(String filter, String filterType) {
        return carService.getSingleCar(filter, filterType);
    }

    @Override
    public ResponseEntity<Object> updateCar(Car car) {
        return carService.updateCar(car);
    }

    @Override
    public ResponseEntity<Object> deleteCar(long id) {
        return carService.deleteCar(id);
    }
}
