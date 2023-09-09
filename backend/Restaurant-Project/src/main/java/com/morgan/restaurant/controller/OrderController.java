package com.morgan.restaurant.controller;


import com.morgan.restaurant.model.Order;
import com.morgan.restaurant.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("orders")
    public List<Order> getAllOrders(@RequestParam int page,@RequestParam int size) {
        return orderService.allOrders(page, size);
    }

    @GetMapping("category")
    public List<Order> getOrderByCategoryId(@RequestParam Long id,@RequestParam int page,@RequestParam int size) {
        return orderService.getOrdersByCategoryId(id, page, size);
    }

    @GetMapping("search")
    public List<Order> searchForOrder(@RequestParam String name, @RequestParam int page,@RequestParam int size) {
       return this.orderService.findOrderByKey(name, page, size);
    }

    @GetMapping("order")
    public Order getOrderById(@RequestParam Long id) {
        return this.orderService.findOrderById(id);
    }

    @GetMapping("ordersSize")
    public long getOrdersSize() {
        return this.orderService.getOrdersSize();
    }
    @GetMapping("categoryIdSize")
    public long getOrdersSizeByCategoryId(@RequestParam Long id) {
        return this.orderService.getOrdersSizeByCategoryId(id);
    }

    @GetMapping("keySize")
    public long getOrdersSizeByKey(@RequestParam String key) {
        return this.orderService.getOrdersSizeByKey(key);
    }
}
