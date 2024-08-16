'use client';

import React from "react";
import { Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
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
      <div >
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              ThinkThrive
            </Typography>
          </Toolbar>
        </AppBar>
        <ChatBox />
        {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Create Flashcards in Seconds
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Turn your notes into interactive flashcards to help you study smarter.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary"  sx={{ mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </Box>
      </Box>
    </div>
    </ThemeProvider>
  );
};

export default FlashcardsPage;