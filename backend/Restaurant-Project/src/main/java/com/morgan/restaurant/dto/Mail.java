package com.morgan.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Mail {

    private String sendTo;
    private String code;
}
