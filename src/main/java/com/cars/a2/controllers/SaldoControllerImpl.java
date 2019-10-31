package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.SaldoController;
import com.cars.a2.services.SaldoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaldoControllerImpl implements SaldoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SaldoControllerImpl.class);

    private SaldoService saldoService;

    public SaldoControllerImpl(SaldoService saldoService) {
        this.saldoService = saldoService;
    }

    @Override
    public ResponseEntity<Object> getSaldoByDate(String date) {
        return saldoService.getSaldo(date);
    }
}
