package com.cars.a2.models;

import javax.persistence.*;

@Entity
@Table(name = "witnessAddress")
@SequenceGenerator(name = "seq7", initialValue = 3, allocationSize = 100)
public class WitnessAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq7")
    private Integer id;

    private String zipcode;
    private String city;
    private String address;

    @OneToOne(mappedBy = "witnessAddress")
    private Witness witness;

    public WitnessAddress() {
    }

    public WitnessAddress(String zipcode, String city, String address) {
        this.zipcode = zipcode;
        this.city = city;
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
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
        return "WitnessAddress{" +
                "id=" + id +
                ", zipcode='" + zipcode + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
