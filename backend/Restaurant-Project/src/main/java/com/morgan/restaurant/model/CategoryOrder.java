package com.morgan.restaurant.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class CategoryOrder extends BaseEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "data_created")
    @CreationTimestamp
    private Date dataCreated;

    @Column(name = "data_updated")
    @UpdateTimestamp
    private Date dataUpdated;
}
