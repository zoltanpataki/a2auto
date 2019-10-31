package com.cars.a2.services;

import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Saldo;
import com.cars.a2.repositories.SaldoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaldoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SaldoService.class);

    private SaldoRepository saldoRepository;

    public SaldoService(SaldoRepository saldoRepository) {
        this.saldoRepository = saldoRepository;
    }

    public ResponseEntity<Object> getSaldo(String date) {
        List<Saldo> saldoList = saldoRepository.findByTransactionDate(date).orElseThrow(() -> new EntityNotFoundException("Saldo for the given date is not found!"));
        return new ResponseEntity<>(saldoList, HttpStatus.OK);
    }
}
