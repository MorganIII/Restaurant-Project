package com.morgan.restaurant.config;


import com.morgan.restaurant.model.Category;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.criteria.Order;

@Configuration
public class DataRestApiConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] preventMethod = {HttpMethod.GET,HttpMethod.POST, HttpMethod.PUT,HttpMethod.DELETE};


        disableHttpMethod(Order.class, config,preventMethod);
        disableHttpMethod(Category.class, config,preventMethod);
    }

    private void disableHttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] preventMethod ) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(preventMethod)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(preventMethod));
    }
}
