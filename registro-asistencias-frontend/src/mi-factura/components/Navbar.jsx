
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton
} from '@mui/material';
import Menu from "@mui/material/Menu"
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { onLogout } from '../../reducers/auth/slices/authSlice.js';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import { onSelectEmpresa } from '../../reducers/users/empresaSlice.js';
import {createTheme, ThemeProvider} from '@mui/material/styles';



export const Navbar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const username=useSelector((state)=>{return state.auth.username})
  const cookies=new Cookies();
  const empresas=useSelector((state)=>{return state.usuario.empresas})
  const settings= useSelector((state)=>{return state.configuraciones.settings})
  const color2=cookies.get('color2');
  const [anchorEl, setAnchorEl] = useState(null)
  const [empresa, setEmpresa] = useState([empresas[0]])
  const configuracionNueva=useSelector((state)=>{return state.configuracion.settingSelected});
  const roles=cookies.get('roles');
  const open = Boolean(anchorEl)
  const tema = createTheme({
    palette: {
      primary: {
        main: `${configuracionNueva?.color1}`,
      },
      secondary:{
        main:'#000000'
      }
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
    // setEmpresa(target.value)
  }
  const onLogOut=()=>{
    dispatch(onLogout({username:null,logged:false}));
    cookies.set('token','');
    navigate('/');
  }
  const theme=createTheme({
    typography:{
      fontSize:12
    },
    
  })
  const onConfig=()=>{
    navigate('/configuracion')
  }
  let data=roles.filter((val) => val.includes('admin'))
  return (
    <>
    <ThemeProvider theme={tema}>
      <AppBar position='static' >
        <Toolbar>
          <ThemeProvider theme={theme}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Mi Factura Portal
            </Typography>
          </ThemeProvider>
          <Stack direction='row' spacing={2}>
            <Button
              color='inherit' 
              size='small'
              variant='outlined'
              id='resources-button'
              aria-controls={open ? 'resources-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}>
              <Avatar alt="user" sx={{width:30,height:30, marginRight:1}} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400" />
              {username}
            </Button>
            <Button color='inherit' variant='outlined' onClick={onLogOut} endIcon={<LogoutIcon/>} >Cerrar sesion</Button>
            {data[0]==='admin' && (<IconButton color='secondary' onClick={onConfig}><SettingsIcon /></IconButton>) }
          </Stack>
          <Menu
            id='resources-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            MenuListProps={{
              'aria-labelledby': 'resources-button'
            }}>
            {empresas?.map((item)=>{
              return <MenuItem onClick={()=>{setAnchorEl(null), dispatch(onSelectEmpresa(item))}} key={item.id}>{item.nombre}</MenuItem>
            })}
          </Menu>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
    </>
  )
}
