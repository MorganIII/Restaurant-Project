package com.morgan.restaurant.repository;

import com.morgan.restaurant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByEmail(String email);

    @Query("select u.password from User u where u.email=?1")
    public String getPasswordByEmail(String email);
    public boolean existsByEmail(String email);

    @Query("select u.active from User u where u.email=?1")
    public int checkActivity(String email);


}
