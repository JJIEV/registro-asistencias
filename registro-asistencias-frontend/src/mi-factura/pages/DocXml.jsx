import { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cargarDocXml } from "../../reducers/docs/xml/docXML.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {IconButton} from "@mui/material";
import Cookies from "universal-cookie";
import { useNavigate} from "react-router-dom";
import { getXml } from "../../reducers/docs/xml/xmlActions.js";
import { getKude } from "../../reducers/docs/kude/kudeActions.js";





export const DocXml = () => {
  const [ver, setVer] = useState(null);
  const cookies=new Cookies();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(
    () => {dispatch(cargarDocXml(cookies.get('rowDataId')));}
    , []);
  
    const docsXmls=useSelector((state)=>{return state.electronicoXml.docsXml});
    
  return (
    <div>
    <hr/>
    {docsXmls?.map(
      (item)=>{
          if(item.tipo==='FIRMADO'){
            return <ul style={{display:'block',alignContent:'center'}} key={item.id}>
            <div style={{display:'flex', alignItems:'center'}}><li>Ver documento firmado</li>
            <IconButton onClick={()=>{getXml(item.id)}}><VisibilityIcon/></IconButton></div>
            <div style={{display:'flex', alignItems:'center'}}><li>Ver KuDE</li>
            <IconButton onClick={()=>{getKude(item.deId)}}><VisibilityIcon/></IconButton></div>
            </ul > 
          }
      }
    )}
    </div>
  )
}
