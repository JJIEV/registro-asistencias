package com.mifacturaportal.config;

import org.keycloak.representations.adapters.config.AdapterConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class KeycloakConfigProvider {

    @Autowired
    private PropiedadesGeneralesImpl keycloakConfigurationService;

    @Autowired
    public KeycloakConfigProvider(PropiedadesGeneralesImpl keycloakConfigRepository) {
        this.keycloakConfigurationService = keycloakConfigRepository;
    }

    public AdapterConfig getKeycloakConfig() {
        AdapterConfig adapterConfig = new AdapterConfig();
        Map<String, Object> credentials = new HashMap<>();
        credentials.put("secret",keycloakConfigurationService.getProperty("keycloak.credentials.secret"));
        adapterConfig.setAuthServerUrl(keycloakConfigurationService.getProperty("keycloak.auth-server-url"));
        adapterConfig.setCredentials(credentials);
        adapterConfig.setRealm(keycloakConfigurationService.getProperty("keycloak.realm"));
        adapterConfig.setResource(keycloakConfigurationService.getProperty("keycloak.resource"));
        adapterConfig.setSslRequired(keycloakConfigurationService.getProperty("keycloak.ssl-required"));
        return adapterConfig;
    }
}
