package com.morgan.restaurant.service;

import com.morgan.restaurant.dto.PurchaseRequest;
import com.morgan.restaurant.dto.PurchaseResponse;

public interface PurchaseService {

    public PurchaseResponse addRequestOrder(PurchaseRequest purchaseRequest);
}
