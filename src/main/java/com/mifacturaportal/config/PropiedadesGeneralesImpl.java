package com.mifacturaportal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

@Component
public class PropiedadesGeneralesImpl {

    private Map<String, String> propertiesCache = new HashMap<>();

    @PersistenceContext(unitName = "mifacturaPortalEntityManager")
    private EntityManager em;

    @PostConstruct
    public void init() {
        String secret = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_SECRET").getSingleResult();
        propertiesCache.put("keycloak.credentials.secret", secret);
        String authServerURL = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_URL").getSingleResult();
        propertiesCache.put("keycloak.auth-server-url", authServerURL);
        String kcRealm = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_REALM").getSingleResult();
        propertiesCache.put("keycloak.realm", kcRealm);
        String kcResource = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_RESOURCE").getSingleResult();
        propertiesCache.put("keycloak.resource", kcResource);
        propertiesCache.put("keycloak.ssl-required", "external");
        if (propertiesCache.get("keycloak.realm") == null) {
            throw new RuntimeException("Keycloak realm is missing.");
        }

    }

    public String getProperty(String propertyName) {
        return propertiesCache.get(propertyName);
    }

}
