package com.cars.a2.models;

import javax.persistence.*;

@Entity
@SequenceGenerator(name = "seq8", initialValue = 3, allocationSize = 100)
public class Witness {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq8")
    @Column(name = "id")
    private long id;
    private String name;
    private String idCardNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private WitnessAddress witnessAddress;

    public Witness() {
    }

    public Witness(String name, String idCardNumber, WitnessAddress witnessAddress) {
        this.name = name;
        this.idCardNumber = idCardNumber;
        this.witnessAddress = witnessAddress;
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

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public WitnessAddress getWitnessAddress() {
        return witnessAddress;
    }

    public void setWitnessAddress(WitnessAddress witnessAddress) {
        this.witnessAddress = witnessAddress;
    }

    @Override
    public String toString() {
        return "Witness{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", idCardNumber='" + idCardNumber + '\'' +
                ", witnessAddress=" + witnessAddress +
                '}';
    }
}
