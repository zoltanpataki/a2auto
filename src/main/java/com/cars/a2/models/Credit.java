package com.cars.a2.models;

import javax.persistence.*;

@Entity
@Table(name = "credit")
public class Credit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String bank;
    private String creditType;
    private int initialPayment;
    private int creditAmount;
    private int creditLength;
    private int repayment;

    @OneToOne(mappedBy = "credit")
    private Orders creditOrder;

    public Credit() {
    }

    public Credit(String bank, String creditType, int initialPayment, int creditAmount, int creditLength, int repayment) {
        this.bank = bank;
        this.creditType = creditType;
        this.initialPayment = initialPayment;
        this.creditAmount = creditAmount;
        this.creditLength = creditLength;
        this.repayment = repayment;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getCreditType() {
        return creditType;
    }

    public void setCreditType(String creditType) {
        this.creditType = creditType;
    }

    public int getInitialPayment() {
        return initialPayment;
    }

    public void setInitialPayment(int initialPayment) {
        this.initialPayment = initialPayment;
    }

    public int getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(int creditAmount) {
        this.creditAmount = creditAmount;
    }

    public int getCreditLength() {
        return creditLength;
    }

    public void setCreditLength(int creditLength) {
        this.creditLength = creditLength;
    }

    public int getRepayment() {
        return repayment;
    }

    public void setRepayment(int repayment) {
        this.repayment = repayment;
    }

    @Override
    public String toString() {
        return "Credit{" +
                "id=" + id +
                ", bank='" + bank + '\'' +
                ", creditType='" + creditType + '\'' +
                ", initialPayment=" + initialPayment +
                ", creditAmount=" + creditAmount +
                ", creditLength=" + creditLength +
                ", repayment=" + repayment +
                '}';
    }
}
