package com.morgan.restaurant.controller;


import com.morgan.restaurant.dto.PurchaseRequest;
import com.morgan.restaurant.dto.PurchaseResponse;
import com.morgan.restaurant.service.PurchaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/buy")
public class PurchaseController {

    private PurchaseServiceImpl purchaseService;

    @Autowired
    public PurchaseController(PurchaseServiceImpl purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse addRequestOrder(@RequestBody PurchaseRequest purchaseRequest) {
        return purchaseService.addRequestOrder(purchaseRequest);
    }
}
