import axios from "axios";
import Cookies from "universal-cookie";
import { ApiUrl } from "../../../store/baseUrl.js";

export const getKude= async(id)=>{

try {
  await axios.get(ApiUrl+`/documento-electronico/${id}/PDF`, { 
    responseType: 'blob'})
  .then(blob=>{
    let url = window.URL.createObjectURL(blob.data); 
    const pdfWindow=window.open();
    pdfWindow.location.href = url;  
    a.click();
    window.URL.revokeObjectURL(url);
    url = "";
  })
} catch (error) {
  return error;
}
} 
export const existKude=async(id)=>{
  const cookie=new Cookies();
  const token=cookie.get('token');
try {
  const blob=  await axios.get(ApiUrl+`/documento-electronico/${id}/PDF`, { 
    headers: {"Authorization" : `Bearer ${token}`},
    responseType: 'blob'});
    return blob.status;
} catch (error) {
  console.log(error);
  return error.response.status;
} 
}