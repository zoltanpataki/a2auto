package com.cars.a2.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
    private boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
    private boolean wantInheritanceTaxCalculation;
    private int inheritanceTax;
    private boolean thereIsCountInCar;
    private int downPayment;
    private int extra;
    private String selectedTypeOfBuying;
    private Long carId;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<Description> description = new ArrayList<>();

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "users", referencedColumnName = "id")
    private Users users;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "company", referencedColumnName = "id")
    private Company company;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "count_in_car_supplement_id", referencedColumnName = "id")
    private CountInCarSupplement countInCarSupplement;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_order_id", referencedColumnName = "id")
    private Credit credit;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "count_in_car", referencedColumnName = "id")
    private Car countInCar;

    public Order() {
    }

    public Order(boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready, boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate, boolean wantInheritanceTaxCalculation, int inheritanceTax, boolean thereIsCountInCar, int downPayment, int extra, String selectedTypeOfBuying, CountInCarSupplement countInCarSupplement, Credit credit, Users users, Company company, Car countInCar, Long carId, List<Description> description) {
        this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
        this.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate = selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
        this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
        this.inheritanceTax = inheritanceTax;
        this.thereIsCountInCar = thereIsCountInCar;
        this.downPayment = downPayment;
        this.extra = extra;
        this.selectedTypeOfBuying = selectedTypeOfBuying;
        this.countInCarSupplement = countInCarSupplement;
        this.credit = credit;
        this.users = users;
        this.company = company;
        this.countInCar = countInCar;
        this.carId = carId;
        this.description = description;
    }

    public int getExtra() {
        return extra;
    }

    public void setExtra(int extra) {
        this.extra = extra;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Car getCountInCar() {
        return countInCar;
    }

    public void setCountInCar(Car countInCar) {
        this.countInCar = countInCar;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready() {
        return alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
    }

    public void setAlreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready(boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready) {
        this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
    }

    public boolean isSelectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate() {
        return selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
    }

    public void setSelectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate(boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate) {
        this.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate = selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
    }

    public boolean isWantInheritanceTaxCalculation() {
        return wantInheritanceTaxCalculation;
    }

    public void setWantInheritanceTaxCalculation(boolean wantInheritanceTaxCalculation) {
        this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
    }

    public int getInheritanceTax() {
        return inheritanceTax;
    }

    public void setInheritanceTax(int inheritanceTax) {
        this.inheritanceTax = inheritanceTax;
    }

    public boolean isThereIsCountInCar() {
        return thereIsCountInCar;
    }

    public void setThereIsCountInCar(boolean thereIsCountInCar) {
        this.thereIsCountInCar = thereIsCountInCar;
    }

    public int getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(int downPayment) {
        this.downPayment = downPayment;
    }

    public String getSelectedTypeOfBuying() {
        return selectedTypeOfBuying;
    }

    public void setSelectedTypeOfBuying(String selectedTypeOfBuying) {
        this.selectedTypeOfBuying = selectedTypeOfBuying;
    }

    public CountInCarSupplement getCountInCarSupplement() {
        return countInCarSupplement;
    }

    public void setCountInCarSupplement(CountInCarSupplement countInCarSupplement) {
        this.countInCarSupplement = countInCarSupplement;
    }

    public Credit getCredit() {
        return credit;
    }

    public void setCredit(Credit credit) {
        this.credit = credit;
    }

    public List<Description> getDescription() {
        return description;
    }

    public void setDescription(List<Description> description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready=" + alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready +
                ", selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate=" + selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate +
                ", wantInheritanceTaxCalculation=" + wantInheritanceTaxCalculation +
                ", inheritanceTax=" + inheritanceTax +
                ", thereIsCountInCar=" + thereIsCountInCar +
                ", downPayment=" + downPayment +
                ", extra=" + extra +
                ", selectedTypeOfBuying='" + selectedTypeOfBuying + '\'' +
                ", carId=" + carId +
                ", description=" + description +
                ", users=" + users +
                ", company=" + company +
                ", countInCarSupplement=" + countInCarSupplement +
                ", credit=" + credit +
                ", countInCar=" + countInCar +
                '}';
    }
}
