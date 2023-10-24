import { ApiUrl } from "../../../store/baseUrl";
import Cookies from "universal-cookie";
export const generarToken = async (usuario, contra) => {
  


    const url = ApiUrl + "/keycloak/login"; 
  
    const requestOpt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usuario,
        password: contra
      })
    };
   
  
    try {
      const response = await fetch(url, requestOpt);
      if (response.ok) {
        const tokenJson = await response.json();
        // return tokenJson.accessToken;
        return tokenJson;
      } else {
        console.warn("Token generation failed");
        return '';
      }
    } catch (error) {
      console.warn(error);
      return '';
    }
  };
  export const generarTokenConRefreshToken = async (refreshToken) => {
    // const url = "http://localhost:8484" + "/keycloak/login"; 
    const cookies = new Cookies();



    const url = ApiUrl + "/keycloak/token-refreshtoken";  
  
    const body = new URLSearchParams();
    body.append('refreshTokenValue', refreshToken);

    const requestOpt = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString(),
    };
  
  
    try {
      const response = await fetch(url, requestOpt);
      if (response.ok) {
        const tokenJson = await response.json();
        // return tokenJson.accessToken;
        cookies.set('token', tokenJson.access_token, { maxAge: tokenJson.expires_in });
        cookies.set('refreshToken', tokenJson.refresh_token, { maxAge: tokenJson.refresh_expires_in } );
        
        return tokenJson;
      } else {
        console.warn("Token generation failed");
        return '';
      }
    } catch (error) {
      console.warn(error);
      return '';
    }
  };
  export const aDias=(segundos)=>{

    return (segundos/(24*60*60))

}