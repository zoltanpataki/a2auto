package com.cars.a2.models;

import javax.persistence.*;

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
    private String selectedTypeOfBuying;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "count_in_order_id", referencedColumnName = "id")
    private CountInCarSupplement countInCarSupplement;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credit_order_id", referencedColumnName = "id")
    private Credit credit;

    public Order() {
    }

    public Order(boolean alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready, boolean selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate, boolean wantInheritanceTaxCalculation, int inheritanceTax, boolean thereIsCountInCar, int downPayment, String selectedTypeOfBuying, CountInCarSupplement countInCarSupplement, Credit credit) {
        this.alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready = alreadyOrNewCustomerSelectorTrueIfNewFalseIfAlready;
        this.selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate = selectedBetweenIndividualOrCorporateTrueIfIndividualFalseIfCorporate;
        this.wantInheritanceTaxCalculation = wantInheritanceTaxCalculation;
        this.inheritanceTax = inheritanceTax;
        this.thereIsCountInCar = thereIsCountInCar;
        this.downPayment = downPayment;
        this.selectedTypeOfBuying = selectedTypeOfBuying;
        this.countInCarSupplement = countInCarSupplement;
        this.credit = credit;
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
                ", selectedTypeOfBuying='" + selectedTypeOfBuying + '\'' +
                ", countInCarSupplement=" + countInCarSupplement +
                ", credit=" + credit +
                '}';
    }
}
