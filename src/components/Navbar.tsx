import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Home', path: '/', underConstruction: false },
    { text: 'Exercises', path: '/exercises', underConstruction: false },
    { text: 'Workout Builder', path: '/workout-builder', underConstruction: false },
    { text: 'Progress', path: '/progress', underConstruction: false },
    { text: 'Form Check', path: '/form-check', underConstruction: false },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
          disabled={item.underConstruction}
        >
          <ListItemText 
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.text}
                {item.underConstruction && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    (Coming Soon)
                  </Typography>
                )}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Workout Guide
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Tooltip 
                  key={item.text} 
                  title={item.underConstruction ? "Coming Soon" : ""}
                  placement="bottom"
                >
                  <span>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to={item.path}
                      disabled={item.underConstruction}
                    >
                      {item.text}
                      {item.underConstruction && " (Soon)"}
                    </Button>
                  </span>
                </Tooltip>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 