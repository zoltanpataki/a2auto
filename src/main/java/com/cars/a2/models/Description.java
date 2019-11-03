package com.cars.a2.models;

import javax.persistence.*;

@Entity
public class Description {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;

    @ManyToOne
    private CountInCarSupplement countInCarSupplement;

    public Description() {
    }

    public Description(String description, CountInCarSupplement countInCarSupplement) {
        this.description = description;
        this.countInCarSupplement = countInCarSupplement;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CountInCarSupplement getCountInCarSupplement() {
        return countInCarSupplement;
    }

    public void setCountInCarSupplement(CountInCarSupplement countInCarSupplement) {
        this.countInCarSupplement = countInCarSupplement;
    }

    @Override
    public String toString() {
        return "Description{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", countInCarSupplement=" + countInCarSupplement +
                '}';
    }
}
