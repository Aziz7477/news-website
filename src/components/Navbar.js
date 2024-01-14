
import { AppBar, Toolbar, Box, IconButton, Typography, Button, Input,InputAdornment } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth, provider } from "../firebaseAuth"
import { signInWithPopup, signOut } from "firebase/auth"
import SearchBox from "./SearchBox";

function Navbar() {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search)

  const handlePages = (page) => {
    dispatch({ type: "SET_CATEGORY", payload: page })
    handleCloseNavMenu();
    navigate(`/${page}`);

  }
  const handleHeadline = () => {
    handleCloseNavMenu();
    navigate("/")
  }
  const handleSearch = (e) => {
    let value = e.target.value;
    dispatch({ type: "SET_SEARCH", payload: value });
  };


  const [user, setUser] = useState({
    email: "",
    name: "",
    userImg: ""
  });


  const handelLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.displayName);
      localStorage.setItem("userImg", data.user.photoURL);
      localStorage.setItem("user", true);
      window.location.reload();
    })
      .catch((err) => {
        console.log(err);
      })

  }

  const handelLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("user", false);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userImg");
        window.location.reload();
      })
    handleCloseUserMenu();

  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser === "true") {
      const storedEmail = localStorage.getItem("userEmail");
      const storedName = localStorage.getItem("userName");
      const storedUserImg = localStorage.getItem("userImg");
      setUser({
        email: storedEmail,
        name: storedName,
        userImg: storedUserImg
      });
    }
  }, []);
  let userAuth = localStorage.getItem("user") === "true";
  return (
    <>
      <AppBar sx={{ background: "#2e1f8f", display: "flex", alignItems: "flex-end", flexDirection: "column", position: "fixed", zIndex: 1 }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                marginRight: 10,
                fontSize: 29
              }}
            >
              NewsHub
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu

                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem className="small-search"> 
                  <SearchBox></SearchBox>
                </MenuItem>
                    
              
                <MenuItem onClick={handleHeadline}>
                  <Typography style={{ display: "flex", justifyContent: "space-around" }} textAlign="center" >Top Headlines</Typography>
                </MenuItem>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePages(page)}>
                    <Typography style={{ display: "flex", justifyContent: "space-around" }} textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              NewsHub
            </Typography>
            <Typography className="big-search">
              <SearchBox />
            </Typography>
            
            <Box style={{ marginRight: "50px", justifyContent: "flex-end" }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button sx={{ my: 2, color: 'white', display: 'block' }} href="/">Top Headlines</Button>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handlePages(page)
                  }
                  }
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="emy Sharp" src={user.userImg} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={handleCloseUserMenu}>
                  {
                    userAuth === true
                      ?
                      <Typography onClick={handelLogout} textAlign="center">
                        Logout
                      </Typography>
                      :
                      <Typography onClick={handelLogin} textAlign="center">
                        Login
                      </Typography>
                  }
                </MenuItem>


              </Menu>
            </Box>
            <Typography className="user-name" style={{ paddingLeft: "10px", fontWeight: "bold" }}>
              {user.name.split(" ")[0]}
            </Typography>
          </Toolbar>

        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}
export default Navbar;