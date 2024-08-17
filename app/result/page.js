'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import getStripe from '@/utils/get-stripe';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(`/api/checkout_session?session_id=${session_id}`);
        const sessionData = await res.json();
        
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error.message || 'An error occurred while retrieving the session.');
        }
      } catch (err) {
        console.log(err)
        setError('An error occurred while retrieving the session.');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
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

  return (
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
      ) : (
        <>
          <Typography variant="h4" gutterBottom color="error">
            Payment failed
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </>
      )}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          <a href="/" onClick={() => router.push('/')}>Return to Home</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default ResultPage;
