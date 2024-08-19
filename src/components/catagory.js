import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Catagory', 'Expence', 'Dashboard'];

export default function Catagory(props: Props) {
    const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      Expence Tracker
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={`/${item}`}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  const [title, setTitle] = useState("");
  const [description,setDescription] = useState("");
  
  const handleSubmit = async () => {
    try{
      const response = await fetch("http://localhost:8000/addCatagory",{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if(response.ok){
        const result = await response.json();
       console.log("Catagory added", result)
      }else{
        console.log("something error")
      }
    }catch(error){
      console.error('Error', error)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Expence Tracker
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
            <div className="button-link"> 
               <button className="button-link2"  onClick={()=>navigate("/catagory")}>Catagory</button>
               <button className="button-link2" onClick={()=>navigate("/expence")}>Expence</button>
               <button className="button-link2" onClick={()=>navigate("/dashboard")}>Dashboard</button>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <p>Catagory</p>
       <div className='form-div'>
       <form className='forms'>
        <TextField id="standard-basic" label="Catagory" variant="standard" onChange={(event)=>setTitle(event.target.value)} value={title} />
        <TextField id="standard-basic" label="Description" variant="standard" onChange={(event)=>setDescription(event.target.value)} value={description} />
        <Button variant="contained" onClick={handleSubmit} >Submit</Button>
        </form>
       </div>
      </Box>
    </Box>
  );
}
