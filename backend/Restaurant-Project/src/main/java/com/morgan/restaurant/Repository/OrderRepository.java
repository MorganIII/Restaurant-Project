package com.morgan.restaurant.Repository;

import com.morgan.restaurant.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;



public interface OrderRepository extends JpaRepository<Order,Long> {

}
