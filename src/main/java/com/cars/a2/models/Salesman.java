package com.cars.a2.models;

import javax.persistence.*;

@Entity
@SequenceGenerator(name = "seq6", initialValue = 3, allocationSize = 100)
public class Salesman {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq6")
    private Long id;

    private String name;

    public Salesman() {}

    public Salesman(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "Salesmen{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
