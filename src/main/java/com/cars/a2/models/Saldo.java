package com.cars.a2.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@SequenceGenerator(name = "seq4", initialValue = 2, allocationSize = 100)
public class Saldo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq4")
    private long id;
    private Date transactionDate;
    private int moneyIn;
    private int moneyOut;
    private String description;

    public Saldo() {
    }

    public Saldo(Date transactionDate, int moneyIn, int moneyOut, String description) {
        this.transactionDate = transactionDate;
        this.moneyIn = moneyIn;
        this.moneyOut = moneyOut;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        this.transactionDate = transactionDate;
    }

    public int getMoneyIn() {
        return moneyIn;
    }

    public void setMoneyIn(int moneyIn) {
        this.moneyIn = moneyIn;
    }

    public int getMoneyOut() {
        return moneyOut;
    }

    public void setMoneyOut(int moneyOut) {
        this.moneyOut = moneyOut;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Saldo{" +
                "id=" + id +
                ", transactionDate=" + transactionDate +
                ", moneyIn=" + moneyIn +
                ", moneyOut=" + moneyOut +
                ", description='" + description + '\'' +
                '}';
    }
}
