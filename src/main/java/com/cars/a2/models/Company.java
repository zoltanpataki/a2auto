package com.cars.a2.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@SequenceGenerator(name = "seq3", initialValue = 2, allocationSize = 100)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq3")
    private long id;
    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "company")
    private List<Car> cars = new ArrayList<>();
    private String name;
    private String address;
    private String companyRegistrationNumber;
    private String representation;

    public Company() {
    }

    public Company(String name, String address, String companyRegistrationNumber, String representation) {
        this.name = name;
        this.address = address;
        this.companyRegistrationNumber = companyRegistrationNumber;
        this.representation = representation;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCompanyRegistrationNumber() {
        return companyRegistrationNumber;
    }

    public void setCompanyRegistrationNumber(String company_registration_number) {
        this.companyRegistrationNumber = company_registration_number;
    }

    public String getRepresentation() {
        return representation;
    }

    public void setRepresentation(String representation) {
        this.representation = representation;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", companyRegistrationNumber='" + companyRegistrationNumber + '\'' +
                ", representation='" + representation + '\'' +
                '}';
    }
}
