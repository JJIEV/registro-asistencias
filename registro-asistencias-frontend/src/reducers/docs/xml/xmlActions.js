import axios from "axios";
import Cookies from "universal-cookie";
import { ApiUrl } from "../../../store/baseUrl.js";

export const getXml = async (id) => {
  const cookie = new Cookies();
  const token = cookie.get('token');
  try {
    await axios.get(ApiUrl + `/documento-electronico/${id}/FIRMADO`, {
      // headers: {"Authorization" : `Bearer ${token}`},
      responseType: 'blob'
    })
      .then(blob => {
        const url = window.URL.createObjectURL(blob.data);
        const pdfWindow = window.open();
        pdfWindow.location.href = url;
        //   const a = document.createElement('a');
        //   a.href = url;
        //   document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
  } catch (error) {
    return error;
  }
}
export const getDeId = (docsXmls) => {
  const cookie = new Cookies();
  cookie.set('idXml', docsXmls[2])
}