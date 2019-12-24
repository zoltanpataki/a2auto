package com.cars.a2.controllers.apis;

import com.cars.a2.models.Utility;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public interface UtilityController {

    @GetMapping("/getUtility/{name}")
    ResponseEntity<Object> getUtility(@PathVariable String name);

    @PostMapping("/saveUtility")
    ResponseEntity<Object> saveUtility(@RequestBody Utility utility);
}
