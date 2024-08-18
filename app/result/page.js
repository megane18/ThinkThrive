'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, CircularProgress, Box, Button, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';

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

const ResultPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const session_id = searchParams.get('session_id') || process.env.NEXT_PUBLIC_DEFAULT_SESSION_ID;
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

  useEffect(() => {
    if (session && session.payment_status === 'paid') {
      const timer = setTimeout(() => {
        router.push('/flashcards');
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!session_id) {
    return (
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
    );
  }

  if (status === 'canceled') {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 36, fontWeight: 'bold' }}>
          Payment Canceled
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          You have canceled the payment process. If you want to try again, please return to the home or login page.
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Button variant="contained" color="primary" component={Link} href="/">
            Return to LoginPage
          </Button>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Button variant="contained" color="primary" component={Link} href="/flashcards">
            Return to HomePage
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
        {session.payment_status === 'paid' ? (
          <>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Thank you for your purchase!
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                We have received your payment. You will receive an email with the order details shortly.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                You will be redirected to the flashcards page in 7 seconds...
              </Typography>
            </Box>
          </>
        ) : session.status === 'open' ? (
          <>
            <PendingIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Complete Your Payment
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                Your payment is pending. Please complete the payment process to access your purchase.
              </Typography>
            </Box>
          </>
        ) : null}
      </Paper>
    </Container>
  );
};

const ResultPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Container>
      }>
        <ResultPageContent />
      </Suspense>
    </ThemeProvider>
  );
};

export default ResultPage;