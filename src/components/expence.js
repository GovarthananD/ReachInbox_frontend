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
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';



interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Catagory', 'Expence', 'Dashboard'];

const currencies = [

  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Transport',
    label: 'Transport',
  }, 
  {
    value: 'Entertainment',
    label: 'Entertainment',
  },
  {
    value: 'Games',
    label: 'Games',
  },
];

export default function Expence(props: Props) {
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

  // const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState("")
  const [catagory, setCatagory] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [savedObject, setSavedObject] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/addExpence", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          catagory,
          date,
          description
        })
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        if (result.data) {
          setSavedObject([...savedObject, result.data]);
          setAmount('');
          setCatagory('');
          setDate('');
          setDescription('')
          console.log("Expence Added", result);
        } else {
          console.log("invalid response from server")
        }
      } else {
        console.log("something error");
      }
    } catch (error) {
      console.log("error", error)
    }
  }


  <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        defaultValue="EUR"
        helperText="Please select your currency"
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </Box>



  return (<>
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
              <button className="button-link2" onClick={() => navigate("/catagory")}>Catagory</button>
              <button className="button-link2" onClick={() => navigate("/expence")}>Expence</button>
              <button className="button-link2" onClick={() => navigate("/dashboard")}>Dashboard</button>
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
        <p>Expence</p>
        <div className='form-div'>
          <form className='forms'>
            {/* <TextField id="standard-basic" label="UserId" variant="standard" onChange={(event)=>setUserId(event.target.value)} value={userId} /> */}
            <TextField id="standard-basic" label="Amount" variant="standard" onChange={(event) => setAmount(event.target.value)} value={amount} />
            
            <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Catagory"
          helperText="Please select your Catagory"
          onChange={(event)=>setCatagory(event.target.value)} value={catagory}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

            <TextField id="standard-basic" variant="standard" type='date' onChange={(event) => setDate(event.target.value)} value={date} />
            <TextField id="standard-basic" label="Description" variant="standard" onChange={(event) => setDescription(event.target.value)} value={description} />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </form>
        </div>
        <div>
          <h3>Saved Expences</h3>
          <ul>
            {savedObject.map((save, index) => {
              return (<div key={index}>
                <h5>{save.catagory}</h5>
                <h5>{save.amount}</h5>
              </div>)
            })}
          </ul>
        </div>
      </Box>
    </Box>
    <Bigdata />
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    </Box>
  </>
  );
}

export function Bigdata() {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  console.log(list)

  const ButtonClick = () => {
    axios.get('http://localhost:8000/getExpence')
      .then(response => {
        console.log(response.data)
        setList(response.data)
        setError(null)
      })
      .catch(error => {
        setError("falid to fetch", error)
      })
  }

  return (<div>
<button onClick={ButtonClick}>User list</button>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {list.result && list.result.map((usr, index) => {
      return (<div key={index}>
        <h5>{usr.catagory}</h5>
        <h5>{usr.amount}</h5>
      </div>)
    })}
    
  </div>)
}
