package com.morgan.restaurant.repository;


import com.morgan.restaurant.model.Country;
import com.morgan.restaurant.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {


}
