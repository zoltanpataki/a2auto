package com.cars.a2.repositories;

import com.cars.a2.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<List<Company>> findByNameContaining(String name);
    Optional<Company> findByCompanyRegistrationNumberContaining(String companyRegistrationNumber);
}
