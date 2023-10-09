package com.morgan.restaurant.util;

import java.util.UUID;

public class Code {

    public static String getCode() {
        return UUID.randomUUID().toString();
    }

}
