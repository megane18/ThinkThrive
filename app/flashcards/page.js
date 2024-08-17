// 'use client';

// import React from "react";
// import { useRouter } from 'next/navigation';
// import { Grid, Container, Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ChatBox from "../components/ChatBox";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#000000',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#e5e7eb',
//     },
//     background: {
//       default: '#000000',
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#e5e7eb',
//     },
//   },
//   typography: {
//     fontFamily: 'Calibri, sans-serif', 
//     h3: {
//       fontWeight: 700,
//     },
//     h4: {
//       fontWeight: 700,
//     },
//     h5: {
//       fontWeight: 400,
//     },
//   },
// });

// const FlashcardsPage = () => {
//   const router = useRouter();
//   return (
//     <ThemeProvider theme={theme}>
//       <div>
//       <AppBar position="static" color="primary">
//           <Toolbar>
//             <Typography variant="h6" color="inherit">
//               ThinkThrive
//             </Typography>
//           </Toolbar>
//         </AppBar>
//       </div>
//       <Container maxWidth="lg">
//         <ChatBox />
//         {/* Hero Section */}
//         <Box sx={{ textAlign: 'center', py: 10 }}>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Welcome to ThinkThrive
//           </Typography>
//           <Typography variant="h5" color="#A9A9A9" gutterBottom>
//             Turn your notes into interactive flashcards to help you study smarter.
//           </Typography>
//           <Box sx={{ mt: 4 }}>
//             <Button variant="contained" color="primary"  sx={{ mr: 2 }} onClick={()=> router.push("/generate")}> 
//               Get Started
//             </Button>
//             <Button variant="outlined" color="primary">
//               Learn More
//             </Button>
//           </Box>
//         </Box>
//         {/* Features Section */}
//           <Box sx={{ py: 10 }}>
//             <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
//               Features
//             </Typography>
//             <Grid container spacing={4} justifyContent="center" textAlign="center">
//               <Grid item xs={12} md={4}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Text to Flashcards
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Quickly convert your study notes or lecture content into flashcards with ease.
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Smart Review
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Our algorithm prioritizes the flashcards you struggle with, helping you focus where it matters.
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Easy Organization
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Organize your flashcards into decks and subjects for seamless studying.
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>

//         {/* Pricing Section */}
//         <Box sx={{ py: 10 }}>
//           <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
//             Pricing
//           </Typography>
//           <Grid container spacing={4} justifyContent="center">
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Free Plan
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Basic features to get you started.
//                 </Typography>
//                 <Typography variant="h4" component="p" gutterBottom>
//                   $0/mo
//                 </Typography>
//                 <Button variant="contained" color="primary" href="/signup">
//                   Sign Up
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Pro Plan
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Advanced features for serious students.
//                 </Typography>
//                 <Typography variant="h4" component="p" gutterBottom>
//                   $9.99/mo
//                 </Typography>
//                 <Button variant="contained" color="primary" href="/signup">
//                   Sign Up
//                 </Button>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: 'center', p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//                 <Typography variant="h6" component="h3" gutterBottom>
//                   Enterprise Plan
//                 </Typography>
//                 <Typography variant="body1" color="#A9A9A9">
//                   Best for teams and large organizations.
//                 </Typography>
//                 <Typography variant="h4" component="p" gutterBottom>
//                   Contact Us
//                 </Typography>
//                 <Button variant="contained" color="primary" href="/contact">
//                   Learn More
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//     </Container>
//     </ThemeProvider>
//   );
// };

// export default FlashcardsPage;

'use client';

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
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

  const PricingCard = ({ title, description, price, buttonText, link }) => (
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
          <Button variant="contained" color="secondary" href={link} sx={{ mt: 2 }}>
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ display: 'inline-block' }}>
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </motion.div>
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
          <Box sx={{ py: 10 }} data-aos="fade-up">
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
                  buttonText="Sign Up"
                  link="/signup"
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