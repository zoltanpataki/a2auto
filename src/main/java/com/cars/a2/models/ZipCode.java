package com.cars.a2.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ZipCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String zipCity;

    public ZipCode(String code, String zipCity) {
        this.code = code;
        this.zipCity = zipCity;
    }

    public ZipCode() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZipCity() {
        return zipCity;
    }

    public void setZipCity(String zipCity) {
        this.zipCity = zipCity;
    }

    @Override
    public String toString() {
        return "ZipCode{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", zipCity='" + zipCity + '\'' +
                '}';
    }
}
