'use client';

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBox from "../components/ChatBox";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e7eb',
    },
    background: {
      default: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
    },
  },
});

const FlashcardsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            ThinkThrive
          </Typography>
        </Toolbar>
      </AppBar>
      <ChatBox />
      {/* More content if needed */}
    </div>
    </ThemeProvider>
  );
};

export default FlashcardsPage;