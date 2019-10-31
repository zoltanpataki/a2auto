package com.cars.a2.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@SequenceGenerator(name = "seq", initialValue = 4, allocationSize = 100)
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private long id;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.REMOVE, orphanRemoval = true, mappedBy = "user")
    private List<Car> cars = new ArrayList<>();
    private String fullName;
    private String birthName;
    private String zipCode;
    private String city;
    private String phoneNumber;
    private String email;
    private String nameOfMother;
    private Date birthDate;
    private String personNumber;
    private String idCardNumber;
    private String dueTimeOfIdCard;
    private String drivingLicenceNumber;
    private String dueTimeOfDrivingLicence;
    private String taxNumber;
    private String healthcareNumber;

    public Users() {
    }

    public Users(String fullName, String birthName, String zipCode, String city, String phoneNumber, String email, String nameOfMother, Date birthDate, String personNumber, String idCardNumber, String dueTimeOfIdCard, String drivingLicenceNumber, String dueTimeOfDrivingLicence, String taxNumber, String healthcareNumber) {
        this.fullName = fullName;
        this.birthName = birthName;
        this.zipCode = zipCode;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.nameOfMother = nameOfMother;
        this.birthDate = birthDate;
        this.personNumber = personNumber;
        this.idCardNumber = idCardNumber;
        this.dueTimeOfIdCard = dueTimeOfIdCard;
        this.drivingLicenceNumber = drivingLicenceNumber;
        this.dueTimeOfDrivingLicence = dueTimeOfDrivingLicence;
        this.taxNumber = taxNumber;
        this.healthcareNumber = healthcareNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getBirthName() {
        return birthName;
    }

    public void setBirthName(String birthName) {
        this.birthName = birthName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNameOfMother() {
        return nameOfMother;
    }

    public void setNameOfMother(String nameOfMother) {
        this.nameOfMother = nameOfMother;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getPersonNumber() {
        return personNumber;
    }

    public void setPersonNumber(String personNumber) {
        this.personNumber = personNumber;
    }

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public String getDueTimeOfIdCard() {
        return dueTimeOfIdCard;
    }

    public void setDueTimeOfIdCard(String dueTimeOfIdCard) {
        this.dueTimeOfIdCard = dueTimeOfIdCard;
    }

    public String getDrivingLicenceNumber() {
        return drivingLicenceNumber;
    }

    public void setDrivingLicenceNumber(String drivingLicenceNumber) {
        this.drivingLicenceNumber = drivingLicenceNumber;
    }

    public String getDueTimeOfDrivingLicence() {
        return dueTimeOfDrivingLicence;
    }

    public void setDueTimeOfDrivingLicence(String dueTimeOfDrivingLicence) {
        this.dueTimeOfDrivingLicence = dueTimeOfDrivingLicence;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getHealthcareNumber() {
        return healthcareNumber;
    }

    public void setHealthcareNumber(String healthcareNumber) {
        this.healthcareNumber = healthcareNumber;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", birthName='" + birthName + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", city='" + city + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", nameOfMother='" + nameOfMother + '\'' +
                ", birthDate=" + birthDate +
                ", personNumber='" + personNumber + '\'' +
                ", idCardNumber='" + idCardNumber + '\'' +
                ", dueTimeOfIdCard='" + dueTimeOfIdCard + '\'' +
                ", drivingLicenceNumber='" + drivingLicenceNumber + '\'' +
                ", dueTimeOfDrivingLicence='" + dueTimeOfDrivingLicence + '\'' +
                ", taxNumber='" + taxNumber + '\'' +
                ", healthcareNumber='" + healthcareNumber + '\'' +
                '}';
    }
}
