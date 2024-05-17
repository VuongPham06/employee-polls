import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser, selectAuthedUser } from '../redux/slices/auth-slice.ts';
import { useAppDispatch, useAppSelector } from '../redux/store.ts';

const tabs: { label: string; url: string }[] = [
  {
    label: 'HOME',
    url: '/'
  },
  {
    label: 'LEADERBOARD',
    url: '/leaderboard'
  },
  {
    label: 'NEW QUESTION',
    url: '/add-new-question'
  }
];

function getDefaultTab(url: string): string {
  let selected = tabs.find(({ url: tabUrl }) => tabUrl === url);
  if (!selected) {
    selected = tabs.find(({ url: tabUrl }) => tabUrl.startsWith(url));
  }
  if (!selected) {
    selected = tabs[0];
  }

  return selected.url;
}

export const Nav = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [tabValue, setTabValue] = useState(getDefaultTab(location.pathname));
  const handleTabValueChange = (_event: React.SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue);
  };

  const auth = useAppSelector(selectAuthedUser);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' }
            }}>
            <Tabs value={tabValue} onChange={handleTabValueChange}>
              {tabs.map((tab) => (
                <Tab
                  value={tab.url}
                  key={'tab-' + tab.url}
                  label={tab.label}
                  to={tab.url}
                  component={Link}
                />
              ))}
            </Tabs>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { md: 'flex' },
              alignItems: 'center',
              borderRadius: 50,
              bgcolor: '#ccc',
              padding: 1,
              marginY: 1,
              marginX: 5
            }}
            aria-label="user-nav-icon">
            <Avatar sx={{ width: 40, height: 40 }} src={auth.avatarURL ?? ''} />
            <Typography variant="h5" mx={1} fontWeight="bold">
              {auth.name}
            </Typography>
          </Box>

          <Button
            sx={{
              color: 'white',
              display: 'block',
              fontSize: 20,
              fontWeight: 'bolder'
            }}
            variant="contained"
            onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
