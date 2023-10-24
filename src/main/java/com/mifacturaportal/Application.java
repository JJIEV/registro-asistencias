package com.mifacturaportal;

import com.mifacturaportal.config.CustomKeycloakSpringBootConfigResolver;
import com.mifacturaportal.config.KeycloakConfigProvider;
import org.keycloak.adapters.KeycloakConfigResolver;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(Application.class);
//        springApplication.setAdditionalProfiles("PROD");
        springApplication.setAdditionalProfiles("DEV");
        springApplication.run(args);
    }

    @Bean
    public KeycloakConfigResolver keycloakConfigResolver(KeycloakConfigProvider keycloakConfigProvider) {
        return new CustomKeycloakSpringBootConfigResolver(keycloakConfigProvider);
    }
    
    @Bean
    public WebMvcConfigurer CORSConfigurer(){
        return new WebMvcConfigurer(){
            @Override
            public void addCorsMappings(CorsRegistry registry){
                registry.addMapping("/**")
                        .allowedMethods("GET")
                        .allowedHeaders("*")
                        .allowedOrigins("*");
            }
        };
    }
    
}
