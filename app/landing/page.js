'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline, IconButton, Modal, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GitHub, LinkedIn } from '@mui/icons-material';

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
    h3: {
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

const ProfileModal = ({ open, onClose, title, profiles }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="profile-modal-title"
    aria-describedby="profile-modal-description"
  >
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }}>
      <Typography variant="h6" id="profile-modal-title" gutterBottom>
        {title}
      </Typography>
      <List>
        {profiles.map((profile, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component="a" href={profile.url} target="_blank" rel="noopener noreferrer">
              <ListItemText primary={profile.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
);

const LandingPage = () => {
  const router = useRouter();
  const [isLinkedInModalOpen, setLinkedInModalOpen] = useState(false);
  const [isGitHubModalOpen, setGitHubModalOpen] = useState(false);

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleLinkedInClick = () => {
    setLinkedInModalOpen(true);
  };

  const handleGitHubClick = () => {
    setGitHubModalOpen(true);
  };

  const handleLinkedInClose = () => {
    setLinkedInModalOpen(false);
  };

  const handleGitHubClose = () => {
    setGitHubModalOpen(false);
  };

  const linkedInProfiles = [
    { name: "Megane Alexis", url: "https://www.linkedin.com/in/megane-alexis/" },
    { name: "Musab Sarmad", url: "https://www.linkedin.com/in/musabsarmad" },
    { name: "Nareen Asad", url: "https://www.linkedin.com/in/nareen-asad" },
    { name: "Kafai Lei", url: "https://www.linkedin.com/in/kafailei/" },
  ];

  const gitHubProfiles = [
    { name: "Megane Alexis", url: "https://github.com/megane18" },
    { name: "Musab Sarmad", url: "https://github.com/musabsarmadmir" },
    { name: "Nareen Asad", url: "https://github.com/nareenasad" },
    { name: "Kafai Lei", url: "https://github.com/will15800" },
    
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F1F0EA 0%, #F9F9F7 100%)',
      }}>
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar>
            <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              ThinkThrive
            </Typography>
            <IconButton
              color="primary"
              onClick={handleGitHubClick}
            >
              <GitHub />
            </IconButton>
            <IconButton
              color="primary"
              onClick={handleLinkedInClick}
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
            <Typography variant="h3"  component="h1" gutterBottom sx={{mt: '10px',  color: '#C06014'}}  >
              ThinkThrive
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ marginBottom: '16px', mt: '10px', color: '#5D5D5D', fontWeight: 'bold' }}>
              Your ultimate learning tool.
            </Typography>
            <Typography variant="h5" paragraph sx={{ maxWidth: '600px', mx: 'auto', mt: '10px'
             }}>
              No longer any need for staying up till 3am to study. ThinkThrive is here to help you learn more efficiently.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSignIn} 
              sx={{ 
                mt: 4,
                px: 4,
                py: 1,
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Log in
            </Button>
          </Box>
        </Container>
        <ProfileModal 
          open={isLinkedInModalOpen} 
          onClose={handleLinkedInClose} 
          title="Choose a LinkedIn Profile"
          profiles={linkedInProfiles}
        />
        <ProfileModal 
          open={isGitHubModalOpen} 
          onClose={handleGitHubClose} 
          title="Choose a GitHub Profile"
          profiles={gitHubProfiles}
        />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;


// 'use client';

// import { useRouter } from 'next/navigation';
// import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline, IconButton } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { GitHub, LinkedIn } from '@mui/icons-material';

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
//     h3: {
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

// const LandingPage = () => {
//   const router = useRouter();

//   const handleSignIn = () => {
//     router.push('/signin');
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #F1F0EA 0%, #F9F9F7 100%)',
//       }}>
//         <AppBar position="static" color="transparent" elevation={1}>
//   <Toolbar>
//     <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//       ThinkThrive
//     </Typography>
//     <IconButton
//       component="a"
//       href="https://github.com/musabsarmadmir/ThinkThrive"
//       target="_blank"
//       rel="noopener noreferrer"
//       color="primary"
//     >
//       <GitHub />
//     </IconButton>
//     <IconButton
//       component="a"
//       href="https://www.linkedin.com/in/your-linkedin-profile"
//       target="_blank"
//       rel="noopener noreferrer"
//       color="primary"
//     >
//       <LinkedIn />
//     </IconButton>
//   </Toolbar>
// </AppBar>
// <Container maxWidth="md">
//   <Box
//     display="flex"
//     flexDirection="column"
//     alignItems="center"
//     justifyContent="center"
//     minHeight="80vh"
//     textAlign="center"
//   >
//     <Typography variant="h3" component="h1" gutterBottom>
//       ThinkThrive
//     </Typography>
//     <Typography variant="h4" component="h2" gutterBottom sx={{ marginBottom: '16px' }}>
//       Your ultimate learning tool.
//     </Typography>
//     <Typography variant="h5" paragraph sx={{ maxWidth: '600px', mx: 'auto', marginBottom: '24px' }}>
//       No longer any need for staying up till 3am to study. ThinkThrive is here to help you learn more efficiently.
//     </Typography>



//             <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={handleSignIn} 
//               sx={{ 
//                 mt: 4,
//                 px: 4,
//                 py: 1,
//                 fontSize: '1.1rem',
//                 boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//                 '&:hover': {
//                   backgroundColor: theme.palette.primary.dark,
//                 }
//               }}
//             >
//               Log in
//             </Button>
//           </Box>
//           <Box
//             display="flex"
//             flexDirection="row"
//             justifyContent="center"
//             alignItems="center"
//             mt={2}
//             mb={2}
//           >
//             {/* You can add additional content here if needed */}
//           </Box>
//         </Container>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default LandingPage;