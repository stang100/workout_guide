import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Exercise Library',
      description: 'Discover and learn proper form for foundational bodyweight exercises.',
      path: '/exercises',
      underConstruction: false,
    },
    {
      title: 'Workout Builder',
      description: 'Create your personalized workout routine with our intelligent workout builder.',
      path: '/workout-builder',
      underConstruction: true,
    },
    {
      title: 'Progress Tracking',
      description: 'Track your fitness journey and celebrate your achievements.',
      path: '/progress',
      underConstruction: true,
    },
    {
      title: 'Form Check',
      description: 'Get real-time feedback on your exercise form using our AI-powered form checker.',
      path: '/form-check',
      underConstruction: false,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" align="center" gutterBottom>
          Welcome to Workout Guide
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Your personal guide to effective workouts and proper form.
          Start your fitness journey today with confidence!
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={6} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
                {feature.underConstruction && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    This feature is under construction and will be available soon!
                  </Alert>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                  disabled={feature.underConstruction}
                >
                  {feature.underConstruction ? 'Coming Soon' : 'Learn More'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 