package com.cars.a2.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company")
@SequenceGenerator(name = "seq3", initialValue = 2, allocationSize = 100)
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq3")
    @Column(name = "id")
    private Long id;
    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "company")
    private List<Car> cars = new ArrayList<>();
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private String companyRegistrationNumber;
    private String representation;
    private String taxNumber;
    private String phoneNumber;
    private String email;

    @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "company")
    private List<Orders> orders = new ArrayList<>();

    public Company() {
    }

    public Company(String name, Address address, String companyRegistrationNumber, String representation, String taxNumber, String phoneNumber, String email) {
        this.name = name;
        this.address = address;
        this.companyRegistrationNumber = companyRegistrationNumber;
        this.representation = representation;
        this.taxNumber = taxNumber;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
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
                ", cars=" + cars +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", companyRegistrationNumber='" + companyRegistrationNumber + '\'' +
                ", representation='" + representation + '\'' +
                ", taxNumber='" + taxNumber + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", order=" + orders +
                '}';
    }
}
