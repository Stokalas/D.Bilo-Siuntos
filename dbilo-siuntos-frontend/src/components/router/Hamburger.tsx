import * as React from 'react';
import {
  Typography,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  SwipeableDrawer,
  Box,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

interface route {
  url: string;
  name: string;
  renderIcon: () => JSX.Element;
}

interface HamburgerProps {
  routes: route[];
}

export const Hamburger: React.FC<HamburgerProps> = ({ routes }) => {
  const [state, setState] = React.useState({
    menuOpen: false,
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, menuOpen: open });
  };

  return (
    <>
      <IconButton sx={{ color: 'white' }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={'top'}
        open={state['menuOpen']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {routes.map((route) => (
              <ListItem
                component={Link}
                sx={{ width: 'fit-content', padding: '0px' }}
                to={route.url}
                key={route.name}
              >
                <Typography component={'span'} color="primary">
                  <ListItemButton>
                    <ListItemIcon>{route.renderIcon()}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItemButton>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
