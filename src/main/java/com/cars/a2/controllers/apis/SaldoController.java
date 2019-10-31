package com.cars.a2.controllers.apis;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public interface SaldoController {

    @GetMapping("/getSaldoByDate")
    ResponseEntity<Object> getSaldoByDate(@RequestParam String date);
}
