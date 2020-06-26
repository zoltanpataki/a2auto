package com.cars.a2.models;

import javax.persistence.*;

@Entity
@Table(name = "address")
@SequenceGenerator(name = "seq5", initialValue = 2, allocationSize = 100)
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq5")
    private Long id;

    private String zipcode;
    private String country;
    private String city;
    private String address;

    @OneToOne(mappedBy = "address")
    private Company company;

    public Address() {
    }

    public Address(String zipcode, String country, String city, String address) {
        this.zipcode = zipcode;
        this.country = country;
        this.city = city;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", zipcode='" + zipcode + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
