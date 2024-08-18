'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import getStripe from "@/utils/get-stripe";
import { Grid, Container, Box, Button, AppBar, Toolbar, Typography, Card, CardContent } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C06014',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F9A03F',
    },
    background: {
      default: '#F1F0EA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3C3C3C',
      secondary: '#5D5D5D',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h2: {
      fontWeight: 700,
      color: '#3C3C3C',
    },
    h4: {
      fontWeight: 600,
      color: '#3C3C3C',
    },
    h5: {
      fontWeight: 400,
      color: '#5D5D5D',
    },
  },
});

const FlashcardsPage = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = async () => {
    try {
      console.log('Starting handleSubmit');
      const response = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to create checkout session');
      }
  
      if (!data.url) {
        throw new Error('No URL returned from the server');
      }
  
      console.log('Redirecting to:', data.url);
      // Use window.open for debugging purposes
      window.location.href = data.url;
      
      // Alternatively, you can use:
      // window.location.href = data.url;
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      alert('An error occurred. Please try again.');
    }
  };
  const FeatureCard = ({ title, description }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  const PricingCard = ({ title, description, price, buttonText, link, onClick }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h4" component="p" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
            {price}
          </Typography>
          <Button variant="contained" color="secondary"  onClick={onClick} href={link} sx={{ mt: 2 }}>
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F1F0EA 0%, #F9F9F7 100%)',
      }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ThinkThrive
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <ChatBox />
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', py: 10 }} data-aos="fade-up">
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to ThinkThrive
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Turn your notes into interactive flashcards to help you study smarter.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ display: 'inline-block', marginRight: '1rem' }}>
                <Button variant="contained" color="primary" onClick={() => router.push("/generate")}>
                  Get Started
                </Button>
              </motion.div>
              {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ display: 'inline-block' }}>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </motion.div> */}
            </Box>
          </Box>
          {/* Features Section */}
          <Box sx={{ py: 10 }} data-aos="fade-up">
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={4} justifyContent="center" textAlign="center">
              <Grid item xs={12} md={4} data-aos="flip-left">
                <FeatureCard
                  title="Text to Flashcards"
                  description="Quickly convert your study notes or lecture content into flashcards with ease."
                />
              </Grid>
              <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="100">
                <FeatureCard
                  title="Smart Review"
                  description="Our algorithm prioritizes the flashcards you struggle with, helping you focus where it matters."
                />
              </Grid>
              <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="200">
                <FeatureCard
                  title="Easy Organization"
                  description="Organize your flashcards into decks and subjects for seamless studying."
                />
              </Grid>
            </Grid>
          </Box>
          {/* Pricing Section */}
          <Box sx={{ py: 10 }} data-aos="fade-up" textAlign="center">
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
              Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4} data-aos="flip-up">
                <PricingCard
                  title="Free Plan"
                  description="Basic features to get you started."
                  price="$0/mo"
                  buttonText="Sign Up"
                  link="/signup"
                />
              </Grid>
              <Grid item xs={12} md={4} data-aos="flip-up" data-aos-delay="100">
                <PricingCard
                  title="Pro Plan"
                  description="Advanced features for serious students."
                  price="$9.99/mo"
                  buttonText="Get Pro"
                  onClick={handleSubmit}
                  // link="/result"
                />
              </Grid>
              <Grid item xs={12} md={4} data-aos="flip-up" data-aos-delay="200">
                <PricingCard
                  title="Enterprise Plan"
                  description="Best for teams and large organizations."
                  price="Contact Us"
                  buttonText="Learn More"
                  link="/contact"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FlashcardsPage;
