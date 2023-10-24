package com.mifacturaportal.servicio;

import com.mifacturaportal.dao.ParametroDao;
import com.mifacturaportal.domain.registro.LoginRequest;
import com.mifacturaportal.domain.registro.TokenResponse;
import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.authorization.client.Configuration;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

@Service
public class KeycloakService {

    @PersistenceContext(unitName = "mifacturaPortalEntityManager")
    private EntityManager em;
    private final ParametroDao parametroDao;

    public KeycloakService(ParametroDao parametroDao) {
        this.parametroDao = parametroDao;
    }

    public TokenResponse tokenAuth(LoginRequest loginRequest){

        TokenResponse tokenResponse = new TokenResponse();

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();


        AccessTokenResponse accessTokenResponse = null;

        try{
            Map<String, Object> credentials = new HashMap<>();
            String secret = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                    .setParameter("username", "KEYCLOAK_SECRET").getSingleResult();
            credentials.put("secret", secret);
            Configuration configuration = new Configuration();
            String authServerURL = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                    .setParameter("username", "KEYCLOAK_URL").getSingleResult();
            configuration.setAuthServerUrl(authServerURL);
            String kcRealm = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                    .setParameter("username", "KEYCLOAK_REALM").getSingleResult();
            configuration.setRealm(kcRealm);
            String kcResource = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                    .setParameter("username", "KEYCLOAK_RESOURCE").getSingleResult();
            configuration.setResource(kcResource);
            configuration.setCredentials(credentials);

            AuthzClient authzClient = AuthzClient.create(configuration);
            accessTokenResponse = authzClient.obtainAccessToken(username, password);
//            Map<String, Object> credentials = new HashMap<>();
//            credentials.put("secret",parametroDao.findParametroByNombre("keycloak.credentials.secret").getValor());
//            Configuration configuration = new Configuration();
//            configuration.setAuthServerUrl(parametroDao.findParametroByNombre("keycloak.auth-server-url").getValor());
//            configuration.setRealm(parametroDao.findParametroByNombre("keycloak.realm").getValor());
//            configuration.setResource(parametroDao.findParametroByNombre("keycloak.resource").getValor());
//            configuration.setCredentials(credentials);
//            AuthzClient authzClient = AuthzClient.create(configuration);
//            accessTokenResponse = authzClient.obtainAccessToken(username, password);

        }catch(RuntimeException re){
            re.printStackTrace();

        }

        tokenResponse.setAccessToken(accessTokenResponse.getToken());
        tokenResponse.setRefreshToken(accessTokenResponse.getRefreshToken());
        tokenResponse.setExpiresIn(accessTokenResponse.getExpiresIn());
        tokenResponse.setRefreshExpiresIn(accessTokenResponse.getRefreshExpiresIn());



        return tokenResponse;
    }

    public String tokenAuthRefresh(String refreshTokenValue) {

        String url = null;



        Map<String, Object> credentials = new HashMap<>();
        String secret = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_SECRET").getSingleResult();
        credentials.put("secret", secret);
        Configuration configuration = new Configuration();
        String authServerURL = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_URL").getSingleResult();
        configuration.setAuthServerUrl(authServerURL);
        String kcRealm = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_REALM").getSingleResult();
        configuration.setRealm(kcRealm);
        String kcResource = em.createQuery("select p.valor from Parametro p where p.nombre = :username", String.class)
                .setParameter("username", "KEYCLOAK_RESOURCE").getSingleResult();
        configuration.setResource(kcResource);
        configuration.setCredentials(credentials);

        url = authServerURL + "realms/" + kcRealm + "/protocol/openid-connect/token";

        RestTemplate restTemplate = new RestTemplate();

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Body
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "refresh_token");
        map.add("refresh_token", refreshTokenValue);
        map.add("client_id", kcResource);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {

            return response.getBody();
        } else {

            return "Error al refrescar el token";
        }
    }

}

