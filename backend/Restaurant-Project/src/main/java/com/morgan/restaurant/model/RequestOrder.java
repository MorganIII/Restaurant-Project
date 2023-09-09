package com.morgan.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "request_order")
public class RequestOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "code")
    private String code;

    @Column(name = "note")
    @Lob
    private String note;

    @Column(name = "total_price")
    private int totalPrice;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "data_created")
    @CreationTimestamp
    private Date dataCreated;

    @Column(name = "data_updated")
    @CreationTimestamp
    private Date dataUpdated;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "requestOrder")
    private Set<Item> items;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToOne
    @JoinColumn(name = "from_address_id", referencedColumnName = "id")
    private Address fromAddress;

    @OneToOne
    @JoinColumn(name = "to_address_id", referencedColumnName = "id")
    private Address toAddress;
}
