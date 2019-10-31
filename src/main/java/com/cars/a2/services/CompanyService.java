package com.cars.a2.services;

import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Car;
import com.cars.a2.models.Company;
import com.cars.a2.models.Users;
import com.cars.a2.repositories.CompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class CompanyService {

    private static final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public ResponseEntity<Object> saveNewCompany(Company company) {
        try {
            companyRepository.save(company);
            return new ResponseEntity<>("New company saved!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Company couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getSingleCompany(String filter, String filterType) {
        switch (filterType) {
            case "name":
                try {
                    Optional<List<Company>> companyByName = companyRepository.findByNameContaining(filter);
                    return new ResponseEntity<>(companyByName, HttpStatus.OK);
                } catch (Exception e) {
                    throw new EntityNotFoundException("Company is not found by name!");
                }
            case "companyRegistrationNumber":
                try {
                    Optional<Company> companyByRegNum = companyRepository.findByCompanyRegistrationNumberContaining(filter);
                    return new ResponseEntity<>(companyByRegNum, HttpStatus.OK);
                } catch (Exception e) {
                    throw new EntityNotFoundException("Company is not found by Registration Number!");
                }
        }
        return null;
    }

    public ResponseEntity<Object> updateCompany(Company company) {
        try {
            companyRepository.save(company);
            return new ResponseEntity<>("Company is updated!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Company couldn't be updated!");
        }
    }

    public ResponseEntity<Object> deleteCompany(long id) {
        try {
            companyRepository.deleteById(id);
            return new ResponseEntity<>("Company is deleted!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("Company couldn't be deleted!");
        }
    }
}
