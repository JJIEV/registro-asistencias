import Keycloak from "keycloak-js";
export const generateToken= async (usuario, contra) => {
    const keycloak=new Keycloak()

    const realm = "testrealm"
    const url = "https://keycloak-desa.isaportal.com.py/realms/"+ realm + "/protocol/openid-connect/token";

    //const realm = "testrealm"
    //const url = "http://localhost:8080/realms/"+ realm + "/protocol/openid-connect/token";
    const requestOpt = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'grant_type': 'password',
            'client_id': 'testclient',
            'username': usuario,
            'password': contra
        })
    };
    const obtener = await fetch(
        url,
        requestOpt
    ).then(
        //Respuesta de la llamada al api
        (response) => response.json().then(
            (tokenJson) => {
                console.log("Token generado");
                //console.log(tokenJson.access_token);
                // saveCookie("token",tokenJson.access_token,300);
                return tokenJson.access_token;
            }
        )
    ).catch(
        (error) => {
            console.warn(error);
            return '';
        }
    );
    return obtener;
}
export const  parseJwt=(token)=> {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

    // export function initKeycloak(){
    //     var keycloak=new Keycloak({
    //         url:"http://localhost:8080/realms/",
    //         realm :"testrealm",
    //         clientId: 'testclient'
    //     });
    //     keycloak.init({
    //         onLoad:'login-required'
    //     }).then(function(){
    //         var profileData=keycloak.loadUserProfile();
    //         profileData.then(function (userProfile){
    //             console.log('profile data'+JSON.stringify(userProfile))
    //         });
    //         var userInfo=keycloak.loadUserInfo();
    //         userInfo.then(function (userData){
    //             console.log('user info',JSON.stringify(userData))
    //         })
    //     }).catch(function(){
    //         alert('no se puede iniciar')
    //     })
    // }
