package com.cars.a2.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@SequenceGenerator(name = "seq2", initialValue = 5, allocationSize = 100)
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq2")
    private long id;

    @ManyToOne
    private Users user;

    @ManyToOne
    private Company company;
    private String name;
    private String type;
    private String color;
    private String plateNumber;
    private String specification;
    private String bodyNumber;
    private String engineNumber;
    private int capacity;
    private int vintage;
    private int mileage;
    private Date motExpiry;
    private int price;
    private int purchasingPrice;
    private int cost;
    private String costDescriptions;
    private Date dateOfArrival;
    private Date dateOfLeaving;
    private String typeOfBuying;
    private int inheritanceTax;
    private int downPayment;
    private int payedAmount;
    private int kwh;
    private String carRegistry;
    private Date documentsHandover;
    private Date dueOfContract;
    private Date carHandover;
    private Date dateOfContract;
    private boolean sold;
    private String carOrTruck;
    private String salesman;
    private String insuranceNumber;
    private int weight;
    private int maxWeightAllowed;
    private String fuelType;

    @OneToOne(mappedBy = "countInCar", cascade = CascadeType.REMOVE)
    private Order order;

    public Car() {
    }

    public Car(Users user, Company company, String name, String type, String color, String plateNumber, String specification, String bodyNumber, String engineNumber, int capacity, int vintage, int mileage, Date motExpiry, int price, int purchasingPrice, int cost, String costDescriptions, Date dateOfArrival, Date dateOfLeaving, String typeOfBuying, int inheritanceTax, int downPayment, int payedAmount, int kwh, String carRegistry, Date documentsHandover, Date dueOfContract, Date carHandover, Date dateOfContract, boolean sold, String carOrTruck, String salesman, String insuranceNumber, int weight, int maxWeightAllowed, String fuelType) {
        this.company = company;
        this.user =user;
        this.name = name;
        this.type = type;
        this.color = color;
        this.plateNumber = plateNumber;
        this.specification = specification;
        this.bodyNumber = bodyNumber;
        this.engineNumber = engineNumber;
        this.capacity = capacity;
        this.vintage = vintage;
        this.mileage = mileage;
        this.motExpiry = motExpiry;
        this.price = price;
        this.purchasingPrice = purchasingPrice;
        this.cost = cost;
        this.costDescriptions = costDescriptions;
        this.dateOfArrival = dateOfArrival;
        this.dateOfLeaving = dateOfLeaving;
        this.typeOfBuying = typeOfBuying;
        this.inheritanceTax = inheritanceTax;
        this.downPayment = downPayment;
        this.payedAmount = payedAmount;
        this.kwh = kwh;
        this.carRegistry = carRegistry;
        this.documentsHandover = documentsHandover;
        this.dueOfContract = dueOfContract;
        this.carHandover = carHandover;
        this.dateOfContract = dateOfContract;
        this.sold = sold;
        this.carOrTruck = carOrTruck;
        this.salesman = salesman;
        this.insuranceNumber = insuranceNumber;
        this.weight = weight;
        this.maxWeightAllowed = maxWeightAllowed;
        this.fuelType = fuelType;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getMaxWeightAllowed() {
        return maxWeightAllowed;
    }

    public void setMaxWeightAllowed(int maxWeightAllowed) {
        this.maxWeightAllowed = maxWeightAllowed;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public int getPurchasingPrice() {
        return purchasingPrice;
    }

    public void setPurchasingPrice(int purchasingPrice) {
        this.purchasingPrice = purchasingPrice;
    }

    public String getSalesman() {
        return salesman;
    }

    public void setSalesman(String salesman) {
        this.salesman = salesman;
    }

    public String getCarOrTruck() {
        return carOrTruck;
    }

    public void setCarOrTruck(String carOrTruck) {
        this.carOrTruck = carOrTruck;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getBodyNumber() {
        return bodyNumber;
    }

    public void setBodyNumber(String bodyNumber) {
        this.bodyNumber = bodyNumber;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public int getVintage() {
        return vintage;
    }

    public void setVintage(int vintage) {
        this.vintage = vintage;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public Date getMotExpiry() {
        return motExpiry;
    }

    public void setMotExpiry(Date motExpiry) {
        this.motExpiry = motExpiry;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public String getCostDescriptions() {
        return costDescriptions;
    }

    public void setCostDescriptions(String costDescriptions) {
        this.costDescriptions = costDescriptions;
    }

    public Date getDateOfArrival() {
        return dateOfArrival;
    }

    public void setDateOfArrival(Date dateOfArrival) {
        this.dateOfArrival = dateOfArrival;
    }

    public Date getDateOfLeaving() {
        return dateOfLeaving;
    }

    public void setDateOfLeaving(Date dateOfLeaving) {
        this.dateOfLeaving = dateOfLeaving;
    }

    public String getTypeOfBuying() {
        return typeOfBuying;
    }

    public void setTypeOfBuying(String typeOfBuying) {
        this.typeOfBuying = typeOfBuying;
    }

    public int getInheritanceTax() {
        return inheritanceTax;
    }

    public void setInheritanceTax(int inheritanceTax) {
        this.inheritanceTax = inheritanceTax;
    }

    public int getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(int downPayment) {
        this.downPayment = downPayment;
    }

    public int getPayedAmount() {
        return payedAmount;
    }

    public void setPayedAmount(int payedAmount) {
        this.payedAmount = payedAmount;
    }

    public int getKwh() {
        return kwh;
    }

    public void setKwh(int kwh) {
        this.kwh = kwh;
    }

    public String getCarRegistry() {
        return carRegistry;
    }

    public void setCarRegistry(String carRegistry) {
        this.carRegistry = carRegistry;
    }

    public Date getDocumentsHandover() {
        return documentsHandover;
    }

    public void setDocumentsHandover(Date documentsHandover) {
        this.documentsHandover = documentsHandover;
    }

    public Date getDueOfContract() {
        return dueOfContract;
    }

    public void setDueOfContract(Date dueOfContract) {
        this.dueOfContract = dueOfContract;
    }

    public Date getCarHandover() {
        return carHandover;
    }

    public void setCarHandover(Date carHandover) {
        this.carHandover = carHandover;
    }

    public Date getDateOfContract() {
        return dateOfContract;
    }

    public void setDateOfContract(Date dateOfContract) {
        this.dateOfContract = dateOfContract;
    }

    public boolean isSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", user=" + user +
                ", company=" + company +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", color='" + color + '\'' +
                ", plateNumber='" + plateNumber + '\'' +
                ", specification='" + specification + '\'' +
                ", bodyNumber='" + bodyNumber + '\'' +
                ", engineNumber='" + engineNumber + '\'' +
                ", capacity=" + capacity +
                ", vintage=" + vintage +
                ", mileage=" + mileage +
                ", motExpiry=" + motExpiry +
                ", price=" + price +
                ", purchasingPrice=" + purchasingPrice +
                ", cost=" + cost +
                ", costDescriptions='" + costDescriptions + '\'' +
                ", dateOfArrival=" + dateOfArrival +
                ", dateOfLeaving=" + dateOfLeaving +
                ", typeOfBuying='" + typeOfBuying + '\'' +
                ", inheritanceTax=" + inheritanceTax +
                ", downPayment=" + downPayment +
                ", payedAmount=" + payedAmount +
                ", kwh=" + kwh +
                ", carRegistry='" + carRegistry + '\'' +
                ", documentsHandover=" + documentsHandover +
                ", dueOfContract=" + dueOfContract +
                ", carHandover=" + carHandover +
                ", dateOfContract=" + dateOfContract +
                ", sold=" + sold +
                ", carOrTruck='" + carOrTruck + '\'' +
                ", salesman='" + salesman + '\'' +
                ", insuranceNumber='" + insuranceNumber + '\'' +
                ", weight=" + weight +
                ", maxWeightAllowed=" + maxWeightAllowed +
                ", fuelType=" + fuelType +
                ", order=" + order +
                '}';
    }
}
