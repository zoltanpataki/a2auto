package com.cars.a2.controllers.apis;

import com.cars.a2.models.InheritanceTax;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public interface InheritanceTaxController {

    @GetMapping("/getChargeForInheritanceTax/{kw}/{age}")
    ResponseEntity<Object> getChargeForInheritanceTax(@PathVariable String kw, @PathVariable String age);

    @GetMapping("/getAllInheritanceTaxInfo")
    ResponseEntity<Object> getAllInheritanceTaxInfo();

    @PostMapping("/updateInheritanceTax")
    ResponseEntity<Object> updateInheritanceTax(@RequestBody List<InheritanceTax> inheritanceTaxes);
}
