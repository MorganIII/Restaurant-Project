package com.morgan.restaurant.config;


import com.morgan.restaurant.model.Category;
import com.morgan.restaurant.model.Order;
import com.morgan.restaurant.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class DataRestApiConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] preventMethod = {HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT,HttpMethod.DELETE};


        disableHttpMethod(Order.class, config,preventMethod);
        disableHttpMethod(Category.class, config,preventMethod);
        disableHttpMethod(User.class, config, preventMethod);
    }

    private void disableHttpMethod(Class theClass, RepositoryRestConfiguration config, HttpMethod[] preventMethod ) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(preventMethod)))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(preventMethod));
    }
}
