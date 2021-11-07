package com.cars.a2.models;

import java.util.List;

public class CarsAndQuantity {
    private int quantity;
    private List<Car> cars;

    public CarsAndQuantity(int quantity, List<Car> cars) {
        this.quantity = quantity;
        this.cars = cars;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }

    @Override
    public String toString() {
        return "CarsAndQuantity{" +
                "quantity=" + quantity +
                ", cars=" + cars +
                '}';
    }
}
