package com.cars.a2.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "countInCarSupplement")
public class CountInCarSupplement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private int countInPrice;
    private int previousLoan;
    private String previousBank;
    private String loanType;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "countInCarSupplement")
    private List<Description> description = new ArrayList<>();

    @OneToOne(mappedBy = "countInCarSupplement")
    private Order countInOrder;

    public CountInCarSupplement() {
    }

    public CountInCarSupplement(int countInPrice, int previousLoan, String previousBank, String loanType) {
        this.countInPrice = countInPrice;
        this.previousLoan = previousLoan;
        this.previousBank = previousBank;
        this.loanType = loanType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCountInPrice() {
        return countInPrice;
    }

    public void setCountInPrice(int countInPrice) {
        this.countInPrice = countInPrice;
    }

    public int getPreviousLoan() {
        return previousLoan;
    }

    public void setPreviousLoan(int previousLoan) {
        this.previousLoan = previousLoan;
    }

    public String getPreviousBank() {
        return previousBank;
    }

    public void setPreviousBank(String previousBank) {
        this.previousBank = previousBank;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public List<Description> getDescription() {
        return description;
    }

    public void setDescription(List<Description> description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "CountInCarSupplement{" +
                "id=" + id +
                ", countInPrice=" + countInPrice +
                ", previousLoan=" + previousLoan +
                ", previousBank='" + previousBank + '\'' +
                ", loanType='" + loanType + '\'' +
                ", description=" + description +
                '}';
    }
}
