'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { Grid, Container, Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
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
  typography: {
    fontFamily: 'Calibri, sans-serif', 
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 400,
    },
  },
});

const FlashcardsPage = () => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
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
            Welcome to ThinkThrive
          </Typography>
          <Typography variant="h5" color="#A9A9A9" gutterBottom>
            Turn your notes into interactive flashcards to help you study smarter.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary"  sx={{ mr: 2 }} onClick={()=> router.push("/generate")}> 
              Get Started
            </Button>
            <Button variant="outlined" color="primary">
              Learn More
            </Button>
          </Box>
        </Box>
        {/* Features Section */}
          <Box sx={{ py: 10 }}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={4} justifyContent="center" textAlign="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Text to Flashcards
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Quickly convert your study notes or lecture content into flashcards with ease.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Smart Review
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Our algorithm prioritizes the flashcards you struggle with, helping you focus where it matters.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Easy Organization
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Organize your flashcards into decks and subjects for seamless studying.
                </Typography>
              </Grid>
            </Grid>
          </Box>

        {/* Pricing Section */}
        <Box sx={{ py: 10 }}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Free Plan
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Basic features to get you started.
                </Typography>
                <Typography variant="h4" component="p" gutterBottom>
                  $0/mo
                </Typography>
                <Button variant="contained" color="primary" href="/signup">
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Pro Plan
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Advanced features for serious students.
                </Typography>
                <Typography variant="h4" component="p" gutterBottom>
                  $9.99/mo
                </Typography>
                <Button variant="contained" color="primary" href="/signup">
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Enterprise Plan
                </Typography>
                <Typography variant="body1" color="#A9A9A9">
                  Best for teams and large organizations.
                </Typography>
                <Typography variant="h4" component="p" gutterBottom>
                  Contact Us
                </Typography>
                <Button variant="contained" color="primary" href="/contact">
                  Learn More
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
    </Container>
    </ThemeProvider>
  );
};

export default FlashcardsPage;