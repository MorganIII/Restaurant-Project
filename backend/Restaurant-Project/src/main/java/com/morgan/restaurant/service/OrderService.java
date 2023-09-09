package com.morgan.restaurant.service;


import com.morgan.restaurant.model.Order;
import com.morgan.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> allOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return orderRepository.findAll(pageable).getContent();
    }

    public List<Order> getOrdersByCategoryId(Long id, int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return orderRepository.findByCategoryId(id, pageable).getContent();
    }

    public List<Order> findOrderByKey(String key, int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return this.orderRepository.findByNameContaining(key, pageable).getContent();
    }

    public Order findOrderById(Long id) {
         return this.orderRepository.findById(id).get();

    }

    public long getOrdersSize() {
        return this.orderRepository.count();
    }


    public long getOrdersSizeByCategoryId(long id) {
        return this.orderRepository.getOrderSizeByCategoryId(id);
    }

    public long getOrdersSizeByKey(String key) {
        return this.orderRepository.getOrdersSizeByKey(key);
    }
}
