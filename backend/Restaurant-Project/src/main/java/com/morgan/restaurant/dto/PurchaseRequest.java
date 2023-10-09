package com.morgan.restaurant.dto;

import com.morgan.restaurant.model.Address;
import com.morgan.restaurant.model.Client;
import com.morgan.restaurant.model.Item;
import com.morgan.restaurant.model.RequestOrder;
import lombok.Data;

import java.util.Set;

@Data
public class PurchaseRequest {

    private Client client;

    private RequestOrder requestOrder;

    private Set<Item> items;

    private Address toAddress;

    private Address fromAddress;
}
