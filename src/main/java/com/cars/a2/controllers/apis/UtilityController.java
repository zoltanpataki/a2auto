package com.cars.a2.controllers.apis;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public interface UtilityController {

    @GetMapping("/getUtility/{name}")
    ResponseEntity<Object> getUtility(@PathVariable String name);
}
