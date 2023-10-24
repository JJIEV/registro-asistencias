import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
export const Sidebar = () => {
  return (
    <>
      <Box 
        flex={1}
        p={2}
        sx={{display:{xs:"none", sm:"block"}}}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/home">
              <ListItemIcon >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon >
                <PresentToAllIcon />
              </ListItemIcon>
              <ListItemText primary="Emitidos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon >
                <ManageSearchIcon />
              </ListItemIcon>
              <ListItemText primary="Consultas por RUC" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon >
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary="Consultas por CDC" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      
    </>
  )
}
