package com.mifacturaportal.config;

import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.KeycloakDeployment;
import org.keycloak.adapters.KeycloakDeploymentBuilder;
import org.keycloak.adapters.spi.HttpFacade;
import org.keycloak.representations.adapters.config.AdapterConfig;

public class CustomKeycloakSpringBootConfigResolver implements KeycloakConfigResolver {


    private final KeycloakConfigProvider keycloakConfigProvider;


    public CustomKeycloakSpringBootConfigResolver(KeycloakConfigProvider keycloakConfigProvider) {
        this.keycloakConfigProvider = keycloakConfigProvider;
    }

    @Override
    public KeycloakDeployment resolve(HttpFacade.Request request) {
        AdapterConfig keycloakConfig = keycloakConfigProvider.getKeycloakConfig();
        KeycloakDeployment deployment = KeycloakDeploymentBuilder.build(keycloakConfig);
        return deployment;
    }
}
