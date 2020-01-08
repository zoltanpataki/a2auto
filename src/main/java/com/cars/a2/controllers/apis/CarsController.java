package com.cars.a2.controllers.apis;

import com.cars.a2.models.Car;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public interface CarsController {

    @GetMapping("/getAllCars/{allOrSold}")
    ResponseEntity<Object> getAllCars(@PathVariable String allOrSold);

    @PostMapping("/saveCar")
    ResponseEntity<Object> saveCar(@RequestBody Car car);

    @GetMapping("/getSingleCar")
    ResponseEntity<Object> getSingleCar(@RequestParam String filter, @RequestParam String filterType);

    @GetMapping("/getSingleCarById/{id}")
    ResponseEntity<Object> getSingleCarById(@PathVariable long id);

    @PutMapping("/updateCar")
    ResponseEntity<Object> updateCar(@RequestBody Car car);

    @DeleteMapping("/deleteCar/{id}")
    ResponseEntity<Object> deleteCar(@PathVariable long id);
}
