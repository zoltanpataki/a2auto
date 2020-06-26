package com.cars.a2.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
    @Column(name = "individualOrCorporate")
    private boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
    private boolean wantInheritanceTaxCalculation;
    private int inheritanceTax;
    private boolean thereIsCountInCar;
    private int downPayment;
    private int extra;
    private String selectedTypeOfBuying;
    private Long carId;

    @OneToMany(
            mappedBy = "orders",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<Description> description = new ArrayList<>();

    @OneToMany(
            mappedBy = "orders",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<DescriptionWithAmount> descriptionsWithAmount = new ArrayList<>();

    @ManyToOne
    private Users users;

    @OneToOne(cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinColumn(name = "company", referencedColumnName = "id")
    private Company company;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "count_in_car_supplement_id", referencedColumnName = "id")
    private CountInCarSupplement countInCarSupplement;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "credit_order_id", referencedColumnName = "id")
    private Credit credit;

    private Long countInCarId;

    public Orders() {
    }

    public Orders(boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready, boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate, boolean wantInheritanceTaxCalculation, int inheritanceTax, boolean thereIsCountInCar, int downPayment, int extra, String selectedTypeOfBuying, CountInCarSupplement countInCarSupplement, Credit credit, Users users, Company company, Long countInCarId, Long carId, List<Description> description, List<DescriptionWithAmount> descriptionsWithAmount) {
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
        this.countInCarId = countInCarId;
        this.carId = carId;
        this.description = description;
        this.descriptionsWithAmount = descriptionsWithAmount;
    }

    public Long getCountInCarId() {
        return countInCarId;
    }

    public void setCountInCarId(Long countInCarId) {
        this.countInCarId = countInCarId;
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

    public List<DescriptionWithAmount> getDescriptionsWithAmount() {
        return descriptionsWithAmount;
    }

    public void setDescriptionsWithAmount(List<DescriptionWithAmount> descriptionsWithAmount) {
        this.descriptionsWithAmount = descriptionsWithAmount;
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
                ", descriptionsWithAmount=" + descriptionsWithAmount +
                ", users=" + users +
                ", company=" + company +
                ", countInCarSupplement=" + countInCarSupplement +
                ", credit=" + credit +
                ", countInCarId=" + countInCarId +
                '}';
    }
}
