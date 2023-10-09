package com.morgan.restaurant.service;


import com.morgan.restaurant.dto.JwtLogin;
import com.morgan.restaurant.dto.UserPrincipal;
import com.morgan.restaurant.model.User;
import com.morgan.restaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements UserDetailsService {



    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);

        return new UserPrincipal(user);
    }

    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
    }

    public boolean isEmailExist(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public int getUserActive(String email) {
        return userRepository.checkActivity(email);
    }

    @Transactional
    public String getPasswordByEmail(String email) {
        return userRepository.getPasswordByEmail(email);
    }


    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
