package com.morgan.restaurant.repository;

import com.morgan.restaurant.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order,Long> {

    public Page<Order> findByCategoryId(Long id, Pageable pageable);

    public Page<Order> findByNameContaining(String name,Pageable pageable);

    @Query("select count(id) from Order where category.id = ?1")
    public long getOrderSizeByCategoryId(long id);

    @Query("select count(id) from Order where name LIKE %?1%")
    public long getOrdersSizeByKey(String key);
}
