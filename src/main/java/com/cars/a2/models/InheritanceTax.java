package com.cars.a2.models;

import javax.persistence.*;

@Entity
@Table(name = "inheritanceTax")
public class InheritanceTax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String kW;
    private int young;
    private int mediumAged;
    private int old;

    public InheritanceTax() {
    }

    public InheritanceTax(String kW, int young, int mediumAged, int old) {
        this.kW = kW;
        this.young = young;
        this.mediumAged = mediumAged;
        this.old = old;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getkW() {
        return kW;
    }

    public void setkW(String kW) {
        this.kW = kW;
    }

    public int getYoung() {
        return young;
    }

    public void setYoung(int young) {
        this.young = young;
    }

    public int getMediumAged() {
        return mediumAged;
    }

    public void setMediumAged(int mediumAged) {
        this.mediumAged = mediumAged;
    }

    public int getOld() {
        return old;
    }

    public void setOld(int old) {
        this.old = old;
    }

    @Override
    public String toString() {
        return "InheritanceTax{" +
                "id=" + id +
                ", kW='" + kW + '\'' +
                ", young=" + young +
                ", mediumAged=" + mediumAged +
                ", old=" + old +
                '}';
    }
}
