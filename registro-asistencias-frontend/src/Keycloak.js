import Keycloak from "keycloak-js";

const keycloak= new Keycloak({
    
    // url: "https://keycloak-desa.isaportal.com.py/auth",
    // realm: "testrealm",
    // clientId: "testclient"
    
    
    //url: "http://localhost:8080/auth",
    //realm: "testrealm",
    //clientId: "testclient"
});

export default keycloak;