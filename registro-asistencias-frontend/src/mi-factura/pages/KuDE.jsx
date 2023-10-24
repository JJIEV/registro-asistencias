import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { existKude, getKude } from "../../reducers/docs/kude/kudeActions.js";
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';

export const KuDE = ({id}) => {
  const [exist, setExist] = useState(null)
  useEffect(() => {
    existKude(id).then(value=>{setExist(value)})
  }, [])
  
  return (
    <>
    {exist===200&&<div style={{display:'flex', alignItems:'center'}}><li>Ver KuDE</li>
      <IconButton onClick={()=>{getKude(id)}}><VisibilityIcon/></IconButton></div>}
      {exist===500&&<div style={{display:'flex', alignItems:'center'}}><li>Generar KuDE</li>
      <IconButton onClick={()=>{}}><RefreshIcon/></IconButton></div>}
    </>
  )
}
