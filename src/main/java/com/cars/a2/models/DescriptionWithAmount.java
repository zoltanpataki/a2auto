package com.cars.a2.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "descriptionWithAmount")
public class DescriptionWithAmount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;
    private int amount;
    private String charged;

    @ManyToOne()
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Orders orders;

    public DescriptionWithAmount() {
    }

    public DescriptionWithAmount(String description, int amount, String charged) {
        this.description = description;
        this.amount = amount;
        this.charged = charged;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCharged() {
        return charged;
    }

    public void setCharged(String charged) {
        this.charged = charged;
    }

    @Override
    public String toString() {
        return "DescriptionWithAmount{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", charged='" + charged + '\'' +
                '}';
    }
}
