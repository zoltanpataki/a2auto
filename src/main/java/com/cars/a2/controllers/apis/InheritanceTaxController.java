package com.cars.a2.controllers.apis;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public interface InheritanceTaxController {

    @GetMapping("/getChargeForInheritanceTax/{kw}/{age}")
    ResponseEntity<Object> getChargeForInheritanceTax(@PathVariable String kw, @PathVariable String age);
}
