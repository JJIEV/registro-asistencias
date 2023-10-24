package com.mifacturaportal.web;


import com.mifacturaportal.domain.registro.LoginRequest;
import com.mifacturaportal.domain.registro.TokenResponse;
import com.mifacturaportal.servicio.KeycloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
public class KeycloakController {


    @Autowired
    KeycloakService keycloakService;



    @PostMapping("/keycloak/login")
    public ResponseEntity<TokenResponse> getToken(@RequestBody LoginRequest loginRequest){

        return ResponseEntity.ok(keycloakService.tokenAuth(loginRequest));

    }
    @PostMapping("/keycloak/token-refreshtoken")
    public String getTokenConRefreshToken(@RequestParam String refreshTokenValue){
        return keycloakService.tokenAuthRefresh(refreshTokenValue);
    }

}
