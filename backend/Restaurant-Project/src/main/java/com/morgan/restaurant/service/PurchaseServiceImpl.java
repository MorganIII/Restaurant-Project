package com.morgan.restaurant.service;

import com.morgan.restaurant.dto.PurchaseRequest;
import com.morgan.restaurant.dto.PurchaseResponse;
import com.morgan.restaurant.model.RequestOrder;
import com.morgan.restaurant.repository.ClientRepository;
import com.morgan.restaurant.util.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class PurchaseServiceImpl implements PurchaseService{


    private ClientRepository clientRepository;
    private Code code = new Code();

    @Autowired
    public PurchaseServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse addRequestOrder(PurchaseRequest purchaseRequest) {
        RequestOrder requestOrder = purchaseRequest.getRequestOrder();

        String myCode = code.getCode();
        requestOrder.setCode(myCode);

        purchaseRequest.getItems().forEach(item -> requestOrder.addItem(item));

        requestOrder.setFromAddress(purchaseRequest.getFromAddress());
        requestOrder.setToAddress(purchaseRequest.getToAddress());

        purchaseRequest.getClient().addRequestOrder(requestOrder);

        clientRepository.save(purchaseRequest.getClient());

        return new PurchaseResponse(purchaseRequest.getClient().getName(), myCode);
    }

}
