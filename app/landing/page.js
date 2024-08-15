'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn, Public } from '@mui/icons-material';
const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Black
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#e5e7eb', // Light grey
      },
      background: {
        default: '#000000', // Black background
      },
      text: {
        primary: '#ffffff', // White text
        secondary: '#e5e7eb', // Light grey text
      },
    },
  });
  
  const LandingPage = () => {
    const router = useRouter();
  
    const handleSignIn = () => {
      router.push('/signin');
    };
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              ThinkThrive
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            textAlign="center"
          >
            <Typography variant="h3" component="h1" gutterBottom>
              ThinkThrive
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              Your ultimate learning tool.
            </Typography>
            <Typography variant="h5" paragraph>
              No longer any need for staying up till 3am to study. ThinkThrive is here to help you learn more efficiently.
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleSignIn} sx={{ mt: 4 }}>
              Log-in
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            mt={2}
            mb={2}
          ></Box>
        </Container>
      </ThemeProvider>
    );
  };
  
  export default LandingPage;