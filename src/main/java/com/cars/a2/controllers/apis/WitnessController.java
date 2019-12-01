package com.cars.a2.controllers.apis;

import com.cars.a2.models.Witness;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface WitnessController {

    @PostMapping("/saveWitness")
    ResponseEntity<Object> saveWitness(@RequestBody Witness witness);

    @GetMapping("/getWitness")
    ResponseEntity<Object> getWitness(@RequestParam String name);

    @GetMapping("/getAllWitnesses")
    ResponseEntity<Object> getAllWitnesses();

    @PutMapping("/updateWitness")
    ResponseEntity<Object> updateWitness(@RequestBody Witness witness);

    @DeleteMapping("/deleteWitness/{id}")
    ResponseEntity<Object> deleteWitness(@PathVariable Long id);
}
