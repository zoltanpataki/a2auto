package com.cars.a2.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "description")
public class Description {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;
    private String type;

    @ManyToOne()
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Orders orders;

    public Description() {
    }

    public Description(String description, String type) {
        this.description = description;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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


    @Override
    public String toString() {
        return "Description{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
