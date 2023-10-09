package com.morgan.restaurant.repository;

import com.morgan.restaurant.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {
}
