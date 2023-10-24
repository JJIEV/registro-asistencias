import React from 'react'
import {Dialog, DialogTitle,DialogContent,makeStyles,Typography} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import {AppBar, IconButton, Toolbar} from "@mui/material";
import Cookies from 'universal-cookie';

export const Popup = ({openPopup, setPopup,children}) => {
    const cookie=new Cookies();

  return (
    <>
        <Dialog open={openPopup} >
            <DialogTitle >
                <div style={{display:'flex'}}>
                    <Typography variant='h6' component='div' style={{flexGrow:1}}>
                        Histórico
                    </Typography>
                    <IconButton onClick={()=>{setPopup(false), cookie.remove('id')}}><CloseIcon/></IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    </>
  )
}
