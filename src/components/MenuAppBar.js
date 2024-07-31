import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () => {
    window.open('https://github.com/KhaingNaing', '_blank');
  }

  const handleGitHubClick = () => {
    setActive(true);
    window.open('https://github.com/KhaingNaing/Age_estimation_CV', '_blank');
    setTimeout(() => setActive(false), 2000); // Reset active state after 2 seconds
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            AGE PREDICT
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              AgePredict
            </Typography>
            <Typography
              variant="h6"
              component="div"
              onClick={handleGitHubClick}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.3s, color 0.3s',
                backgroundColor: active ? '#d0d0d0' : 'transparent',
                color: active ? '#000' : 'inherit',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  color: '#000',
                },
              }}
            >            
            GitHubCode
            </Typography>
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  padding: 0
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/account.jpg` }
                  alt="Account"
                  style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%'}} // Adjust size as needed
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={openProfile}>Profile</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}