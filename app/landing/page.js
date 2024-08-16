'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn } from '@mui/icons-material';

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
    fontFamily: 'Calibri, sans-serif', // Add your font family here
    h3: {
      fontWeight: 700, // You can customize other typography elements too
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 400,
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
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            ThinkThrive
          </Typography>
          <IconButton
            component="a"
            href="https://github.com/musabsarmadmir/ThinkThrive"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <GitHub />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            <LinkedIn />
          </IconButton>
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
          <Typography variant="h4" component="h1" gutterBottom>
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