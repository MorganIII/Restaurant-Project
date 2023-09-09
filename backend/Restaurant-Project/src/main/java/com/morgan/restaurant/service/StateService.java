package com.morgan.restaurant.service;


import com.morgan.restaurant.model.State;
import com.morgan.restaurant.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {
    private StateRepository stateRepository;

    @Autowired
    public StateService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public List<State> getStatesByCountryCode(String code) {

        return stateRepository.findByCountryCode(code);
    }
}
