// 'use client';

// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import getStripe from "@/utils/get-stripe";
// import { Grid, Container, Box, Button, AppBar, Toolbar, Typography, Card, CardContent, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ChatBox from "../components/ChatBox";
// import { motion } from "framer-motion";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import MenuIcon from '@mui/icons-material/Menu';
// import { signOut } from 'firebase/auth';
// import { auth } from '/firebase'; // Make sure this path is correct

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#C06014',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#F9A03F',
//     },
//     background: {
//       default: '#F1F0EA',
//       paper: '#FFFFFF',
//     },
//     text: {
//       primary: '#3C3C3C',
//       secondary: '#5D5D5D',
//     },
//   },
//   typography: {
//     fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//     h2: {
//       fontWeight: 700,
//       color: '#3C3C3C',
//     },
//     h4: {
//       fontWeight: 600,
//       color: '#3C3C3C',
//     },
//     h5: {
//       fontWeight: 400,
//       color: '#5D5D5D',
//     },
//   },
// });

// const FlashcardsPage = () => {
//   const router = useRouter();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState('');

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       console.log('Starting handleSubmit');
//       const response = await fetch('/api/checkout_session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       console.log('Response status:', response.status);
//       const data = await response.json();
//       console.log('Response data:', data);
  
//       if (!response.ok) {
//         throw new Error(data.error?.message || 'Failed to create checkout session');
//       }
  
//       if (!data.url) {
//         throw new Error('No URL returned from the server');
//       }
  
//       console.log('Redirecting to:', data.url);
//       window.location.href = data.url;
//     } catch (err) {
//       console.error('Error in handleSubmit:', err);
//       setDialogMessage('An error occurred. Please try again.');
//       setDialogOpen(true);
//     }
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setDialogMessage('Logged out successfully!');
//       setDialogOpen(true);
//       setTimeout(() => {
//         router.push('/'); // Redirect to landing page
//       }, 2000);
//     } catch (error) {
//       console.error('Error signing out:', error);
//       setDialogMessage('An error occurred while logging out. Please try again.');
//       setDialogOpen(true);
//     }
//     handleMenuClose();
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//   };

//   const FeatureCard = ({ title, description }) => (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//         <CardContent>
//           <Typography variant="h6" component="h3" gutterBottom color="primary">
//             {title}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             {description}
//           </Typography>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );

//   const PricingCard = ({ title, description, price, buttonText, link, onClick }) => (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//         <CardContent>
//           <Typography variant="h6" component="h3" gutterBottom color="primary">
//             {title}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             {description}
//           </Typography>
//           <Typography variant="h4" component="p" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
//             {price}
//           </Typography>
//           <Button variant="contained" color="secondary"  onClick={onClick} href={link} sx={{ mt: 2 }}>
//             {buttonText}
//           </Button>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #F1F0EA 0%, #F9F9F7 100%)',
//       }}>
//         <AppBar position="static" color="primary">
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               ThinkThrive
//             </Typography>
//             <IconButton
//               size="large"
//               edge="end"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleMenuOpen}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               {/* <MenuItem onClick={() => {
//                 router.push('/flashcards');
//                 handleMenuClose();
//               }}>
               
//               </MenuItem> */}
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Toolbar>
//         </AppBar>
//         <Container maxWidth="lg">
//           <ChatBox />
//           {/* Hero Section */}
//           <Box sx={{ textAlign: 'center', py: 10 }} data-aos="fade-up">
//             <Typography variant="h2" component="h1" gutterBottom>
//               Welcome to ThinkThrive
//             </Typography>
//             <Typography variant="h5" color="text.secondary" gutterBottom>
//               Turn your notes into interactive flashcards to help you study smarter.
//             </Typography>
//             <Box sx={{ mt: 4 }}>
//               <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ display: 'inline-block', marginRight: '1rem' }}>
//                 <Button variant="contained" color="primary" onClick={() => router.push("/generate")}>
//                   Get Started
//                 </Button>
//               </motion.div>
//             </Box>
//           </Box>
//           {/* Features Section */}
//           <Box sx={{ py: 10 }} data-aos="fade-up">
//             <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
//               Features
//             </Typography>
//             <Grid container spacing={4} justifyContent="center" textAlign="center">
//               <Grid item xs={12} md={4} data-aos="flip-left">
//                 <FeatureCard
//                   title="Text to Flashcards"
//                   description="Quickly convert your study notes or lecture content into flashcards with ease."
//                 />
//               </Grid>
//               <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="100">
//                 <FeatureCard
//                   title="Smart Review"
//                   description="Our algorithm prioritizes the flashcards you struggle with, helping you focus where it matters."
//                 />
//               </Grid>
//               <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="200">
//                 <FeatureCard
//                   title="Easy Organization"
//                   description="Organize your flashcards into decks and subjects for seamless studying."
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//           {/* Pricing Section */}
//           <Box sx={{ py: 10 }} data-aos="fade-up" textAlign="center">
//             <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
//               Pricing
//             </Typography>
//             <Grid container spacing={4} justifyContent="center">
//               <Grid item xs={12} md={4} data-aos="flip-up">
//                 <PricingCard
//                   title="Free Plan"
//                   description="Basic features to get you started."
//                   price="$0/mo"
//                   buttonText="Sign Up"
//                   // link="/signup"
//                 />
//               </Grid>
//               <Grid item xs={12} md={4} data-aos="flip-up" data-aos-delay="100">
//                 <PricingCard
//                   title="Pro Plan"
//                   description="Advanced features for serious students."
//                   price="$5.00/mo"
//                   buttonText="Get Pro"
//                   onClick={handleSubmit}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4} data-aos="flip-up" data-aos-delay="200">
//                 <PricingCard
//                   title="Enterprise Plan"
//                   description="Best for teams and large organizations."
//                   price="Contact Us"
//                   buttonText="Learn More"
//                   link="/contact"
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>

//         <Dialog
//           open={dialogOpen}
//           onClose={handleCloseDialog}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               {dialogMessage}
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} color="primary" autoFocus>
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default FlashcardsPage;


'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import getStripe from "@/utils/get-stripe";
import { Grid, Container, Box, Button, AppBar, Toolbar, Typography, Card, CardContent, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBox from "../components/ChatBox";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { auth } from '/firebase'; // Make sure this path is correct

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [freeModalOpen, setFreeModalOpen] = useState(false);

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
      window.location.href = data.url;
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setDialogMessage('An error occurred. Please try again.');
      setDialogOpen(true);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDialogMessage('Logged out successfully!');
      setDialogOpen(true);
      setTimeout(() => {
        router.push('/'); // Redirect to landing page
      }, 2000);
    } catch (error) {
      console.error('Error signing out:', error);
      setDialogMessage('An error occurred while logging out. Please try again.');
      setDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseFreeModal = () => {
    setFreeModalOpen(false);
  };

  const handleUpgradeFromFreeModal = () => {
    setFreeModalOpen(false);
    handleSubmit();
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
          <Button variant="contained" color="secondary" onClick={onClick} href={link} sx={{ mt: 2 }}>
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
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              ThinkThrive
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
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
                  onClick={() => setFreeModalOpen(true)}
                />
              </Grid>
              <Grid item xs={12} md={4} data-aos="flip-up" data-aos-delay="100">
                <PricingCard
                  title="Pro Plan"
                  description="Advanced features for serious students."
                  price="$5.00/mo"
                  buttonText="Get Pro"
                  onClick={handleSubmit}
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

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* New Modal for Free Plan */}
        <Dialog
          open={freeModalOpen}
          onClose={handleCloseFreeModal}
          aria-labelledby="free-plan-dialog-title"
          aria-describedby="free-plan-dialog-description"
        >
          <DialogTitle id="free-plan-dialog-title">{"Free Plan Information"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="free-plan-dialog-description">
              You are currently using the free plan. There&apos;s no need to sign up again. Do you want to upgrade your plan?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFreeModal} color="primary">
              No, thanks
            </Button>
            <Button onClick={handleUpgradeFromFreeModal} color="primary" autoFocus>
              Yes, upgrade
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default FlashcardsPage;