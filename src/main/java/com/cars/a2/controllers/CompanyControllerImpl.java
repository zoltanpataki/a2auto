package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.CompanyController;
import com.cars.a2.models.Company;
import com.cars.a2.services.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyControllerImpl implements CompanyController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyControllerImpl.class);

    private CompanyService companyService;

    public CompanyControllerImpl(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Override
    public ResponseEntity<Object> saveCompany(Company company) {
        return companyService.saveNewCompany(company);
    }

    @Override
    public ResponseEntity<Object> getCompany(String filter, String filterType) {
        return companyService.getSingleCompany(filter, filterType);
    }

    @Override
    public ResponseEntity<Object> updateCompany(Company company) {
        return companyService.updateCompany(company);
    }

    @Override
    public ResponseEntity<Object> deleteCompany(long id) {
        return companyService.deleteCompany(id);
    }
}
