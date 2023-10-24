import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { cargarFirma } from "../../reducers/docs/electronicos/firmaSlice.js";
import { Navbar } from "../components/Navbar.jsx";
import { Sidebar } from "../components/Sidebar.jsx";


export const Firma = () => {
    let params=useParams();
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(cargarFirma(params.id));
    }, [])
    const firmaDig=useSelector((state)=>{return state.firmaXml.firma})
  return (
    <>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Box flex={4} p={{ xs: 0, md: 2 }}>
            <div>
                <h1>Firma</h1>
              {/* {firmaDig?.map((item)=>{
                  return <span style={{width:"100px", wordWrap:"break-word", display:"inlineBlock"}} key={item.id}>xml:{item.xml}</span>
              })} */}
              <pre style={{wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'}}>{firmaDig}</pre>
            </div>
          </Box>
        </Stack>

    </>
  )
}
