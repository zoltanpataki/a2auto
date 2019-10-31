package com.cars.a2.repositories;

import com.cars.a2.models.Saldo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaldoRepository extends JpaRepository<Saldo, Long> {
    Optional<List<Saldo>> findByTransactionDate(String date);
}
