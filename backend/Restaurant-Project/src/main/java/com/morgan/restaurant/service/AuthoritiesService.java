package com.morgan.restaurant.service;


import com.morgan.restaurant.model.Authorities;
import com.morgan.restaurant.repository.AuthoritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;


    @Autowired
    public AuthoritiesService(AuthoritiesRepository authoritiesRepository) {
        this.authoritiesRepository = authoritiesRepository;
    }

    public List<Authorities> getAuthorities() {
        return authoritiesRepository.findAll();
    }
}
