package com.morgan.restaurant.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {

    private String email;
    private String password;
    private String code;
}
