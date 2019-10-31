package com.cars.a2.controllers.apis;

import com.cars.a2.models.Company;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface CompanyController {

    @PostMapping("/saveCompany")
    ResponseEntity<Object> saveCompany(@RequestBody Company company);

    @GetMapping("/getCompany")
    ResponseEntity<Object> getCompany(@RequestParam String filter, @RequestParam String filterType);

    @PutMapping("/updateCompany")
    ResponseEntity<Object> updateCompany(@RequestBody Company company);

    @DeleteMapping("/deleteCompany/{id}")
    ResponseEntity<Object> deleteCompany(@PathVariable long id);
}
