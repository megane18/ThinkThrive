'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  // Fallback to hardcoded session ID if not in URL
  const session_id = searchParams.get('session_id') || "cs_live_a1njKdRaUFRG0housOvFeHG7JDpWei6o8xtMJMp16y2KqRQsiFm2P0r7rL";
  const status = searchParams.get('status');

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const sessionData = await res.json();
        setSession(sessionData);
      } catch (err) {
        setError('An error occurred while retrieving the session.');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Container>
      </ThemeProvider>
    );
  }

  if (!session_id) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="error">
            No session information available. Please try your purchase again.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" component={Link} href="/">
              Return to Home
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  if (status === 'canceled') {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 36, fontWeight: 'bold' }}>
            Payment Canceled
          </Typography>
          <Typography variant="h5" sx={{ mt: 3 }}>
            You have canceled the payment process. If you want to try again, please return to the home or login page.
          </Typography>
          <Box sx={{ mt: 5 }}>
            <Button variant="contained" color="primary" component={Link} href="/">
              Return to LoginPage</Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Button variant="contained" color="primary" component={Link} href="/flashcards">
            Return to HomePage
            </Button>
            </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        {session.payment_status === 'paid' ? (
          <>
            <Typography variant="h4" gutterBottom>
              Thank you for your purchase!
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Session ID: {session_id}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                We have received your payment. You will receive an email with the order details shortly.
              </Typography>
            </Box>
          </>
        ) : session.status === 'open' ? (
          <>
            <Typography variant="h4" gutterBottom>
              Complete Your Payment
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Your payment is pending...
              </Typography>
            </Box>
          </>
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default ResultPage;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import getStripe from '@/utils/get-stripe';
// import { Container, Typography, CircularProgress, Box } from '@mui/material';

// const ResultPage = () => {
//   const router = useRouter();
//   // Comment out or remove the line that extracts session_id from the URL
//   // const searchParams = useSearchParams();
//   // const session_id = searchParams.get('session_id');

//   // Use the hardcoded session ID
//   const session_id = "cs_live_a1njKdRaUFRG0housOvFeHG7JDpWei6o8xtMJMp16y2KqRQsiFm2P0r7rL";

//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCheckoutSession = async () => {
//       if (!session_id) return;
//       try {
//         const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
//         const sessionData = await res.json();
        
//         if (res.ok) {
//           setSession(sessionData);
//         } else {
//           setError(sessionData.error.message || 'An error occurred while retrieving the session.');
//         }
//       } catch (err) {
//         console.log(err)
//         setError('An error occurred while retrieving the session.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCheckoutSession();
//   }, [session_id]);

//   if (loading) {
//     return (
//       <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
//         <CircularProgress />
//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Loading...
//         </Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
//       {session.payment_status === 'paid' ? (
//         <>
//           <Typography variant="h4" gutterBottom>
//             Thank you for your purchase!
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Session ID: {session_id}</Typography>
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               We have received your payment. You will receive an email with the order details shortly.
//             </Typography>
//           </Box>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4" gutterBottom color="error">
//             Payment failed
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="body1" color="text.secondary">
//               Your payment was not successful. Please try again.
//             </Typography>
//           </Box>
//         </>
//       )}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="body1">
//           <a href="/" onClick={() => router.push('/')}>Return to Home</a>
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default ResultPage;
