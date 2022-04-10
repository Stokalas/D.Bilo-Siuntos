import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, Typography, ListItemText, ListItemButton } from '@mui/material';

type NavBarButtonProps = {
  name: string;
  url: string;
};

export const NavBarButton: React.FC<NavBarButtonProps> = ({ name, url }) => {
  return (
    <ListItem component={Link} sx={{ width: 'fit-content', padding: '0px' }} to={url}>
      <Typography sx={{ color: 'white' }}>
        <ListItemButton>
          <ListItemText primary={name} />
        </ListItemButton>
      </Typography>
    </ListItem>
  );
};
