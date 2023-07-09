package com.morgan.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order extends CategoryOrder{

    @Column(name = "price")
    private int price;

    @Column(name = "image")
    private String img;


    @Type( type = "org.hibernate.type.MaterializedClobType")
    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;
}
