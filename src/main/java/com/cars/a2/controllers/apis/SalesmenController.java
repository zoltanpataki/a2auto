package com.cars.a2.controllers.apis;

import com.cars.a2.models.Salesman;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface SalesmenController {

    @PostMapping("/saveSalesman")
    ResponseEntity<Object> saveSalesman(@RequestBody Salesman salesman);

    @GetMapping("/getSalesman")
    ResponseEntity<Object> getSalesman(@RequestParam String name);

    @GetMapping("/getAllSalesmen")
    ResponseEntity<Object> getAllSalesmen();

    @PutMapping("/updateSalesman")
    ResponseEntity<Object> updateSalesman(@RequestBody Salesman salesman);

    @DeleteMapping("/deleteSalesman/{id}")
    ResponseEntity<Object> deleteSalesman(@PathVariable Long id);
}
