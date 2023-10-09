package com.morgan.restaurant.controller;


import com.morgan.restaurant.dto.*;
import com.morgan.restaurant.model.User;
import com.morgan.restaurant.service.AuthoritiesService;
import com.morgan.restaurant.service.EmailService;
import com.morgan.restaurant.service.TokenService;
import com.morgan.restaurant.service.UserService;
import com.morgan.restaurant.util.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin("http://localhost:4200")
public class UserController {


    private EmailService emailService;
    private TokenService authenticationFilter;
    private UserService userService;
    private AuthoritiesService authoritiesService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(TokenService authenticationFilter, UserService userService, AuthoritiesService authoritiesService, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.authenticationFilter = authenticationFilter;
        this.userService = userService;
        this.authoritiesService = authoritiesService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }




    @PostMapping("/signin")
    public LoginResponse login(@RequestBody JwtLogin jwtLogin) {
        return authenticationFilter.login(jwtLogin);
    }

    @PostMapping("/signup")
    public AccountResponse createUser(@RequestBody JwtLogin jwtLogin) {
        AccountResponse response = new AccountResponse();
        boolean alreadyExist = userService.isEmailExist(jwtLogin.getEmail());
        if(alreadyExist) {
            response.setResult(0);
            return response;
        }

        User user = new User();
        user.setEmail(jwtLogin.getEmail());
        user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
        user.setActive(0);
        user.getAuthorities().add(authoritiesService.getAuthorities().get(0));
        String myCode = Code.getCode();
        user.setCode(myCode);
        //sending mail
        Mail mail = new Mail(jwtLogin.getEmail(), myCode);
        emailService.sendCodyByMail(mail);
        //persist user
        userService.createUser(user);
        response.setResult(1);
        return response;
    }

    @PostMapping("/active")
    public int getActive(@RequestBody JwtLogin login) {
        String pass = userService.getPasswordByEmail(login.getEmail());
        boolean res = passwordEncoder.matches(login.getPassword(),pass);
        if(res) {
            int act = userService.getUserActive(login.getEmail());
            if(act == 0) {
                String code = Code.getCode();
                Mail mail = new Mail(login.getEmail(),code);
                emailService.sendCodyByMail(mail);
                User user = userService.getUserByEmail(login.getEmail());
                user.setCode(code);
                userService.saveUser(user);
            }
            return act;
        }
        return -1;
    }

    @PostMapping("/activation-req")
    public int activateRequest(@RequestBody ActivateRequest activateRequest) {
        User user = userService.getUserByEmail(activateRequest.getEmail());
        if(!user.getCode().equals(activateRequest.getCode())) {
            return 0;
        }
        user.setActive(1);
        user.setCode(null);
        userService.saveUser(user);
        return 1;
    }

    @PostMapping("/send-code")
    public int sendCodeToMail(@RequestBody EmailRequest request) {
        String email =  request.getEmail();
        User user = userService.getUserByEmail(email);
        if(user != null) {
            String code = Code.getCode();
            Mail mail =  new Mail(email, code);
            emailService.sendCodyByMail(mail);
            user.setCode(code);
            userService.saveUser(user);
            return 1;
        }
        return 0;
    }

    @PostMapping("/reset-password")
    public int resetPassword(@RequestBody ChangePasswordRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        if(user != null) {
            if(user.getCode().equals(request.getCode())) {
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setCode(null);
                userService.saveUser(user);
                return 1;
            }
        }
        return 0;
    }
}
