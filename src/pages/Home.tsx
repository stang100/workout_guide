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
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BuildIcon from '@mui/icons-material/Build';
import TimelineIcon from '@mui/icons-material/Timeline';
import CameraIcon from '@mui/icons-material/Camera';

type FeatureColor = 'primary' | 'secondary' | 'success' | 'info';

interface Feature {
  title: string;
  description: string;
  path: string;
  underConstruction: boolean;
  icon: React.ReactNode;
  color: FeatureColor;
}

const Home = () => {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      title: 'Exercise Library',
      description: 'Discover and learn proper form for foundational bodyweight exercises.',
      path: '/exercises',
      underConstruction: false,
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      color: 'primary',
    },
    {
      title: 'Workout Builder',
      description: 'Create your personalized workout routine with our intelligent workout builder.',
      path: '/workout-builder',
      underConstruction: false,
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      color: 'secondary',
    },
    {
      title: 'Progress Tracking',
      description: 'Track your fitness journey and celebrate your achievements.',
      path: '/progress',
      underConstruction: false,
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      color: 'success',
    },
    {
      title: 'Form Check',
      description: 'Get real-time feedback on your exercise form using our AI-powered form checker.',
      path: '/form-check',
      underConstruction: false,
      icon: <CameraIcon sx={{ fontSize: 40 }} />,
      color: 'info',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box 
        sx={{ 
          textAlign: 'center',
          mb: 8,
          background: (theme) => `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          py: 8,
          px: 4,
          borderRadius: 4,
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Welcome to Workout Guide
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Your personal guide to effective workouts and proper form.
          Start your fitness journey today with confidence!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: 20,
                  background: (theme) => alpha(theme.palette[feature.color].main, 1),
                  borderRadius: 2,
                  p: 1,
                  color: 'white',
                  boxShadow: 2,
                }}
              >
                {feature.icon}
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 5 }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    color: (theme) => alpha(theme.palette[feature.color].main, 1),
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {feature.description}
                </Typography>
                {feature.underConstruction && (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      mt: 2,
                      borderRadius: 2,
                    }}
                  >
                    This feature is under construction and will be available soon!
                  </Alert>
                )}
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color={feature.color}
                  onClick={() => navigate(feature.path)}
                  disabled={feature.underConstruction}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    py: 1,
                    fontWeight: 500,
                  }}
                >
                  {feature.underConstruction ? 'Coming Soon' : 'Get Started'}
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