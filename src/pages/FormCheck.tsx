import React, { useState, useRef, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  SelectChangeEvent,
  alpha,
} from '@mui/material';
import Webcam from 'react-webcam';
import CameraIcon from '@mui/icons-material/Camera';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const exercises = [
  'Push-ups',
  'Squats',
  'Planks',
  'Lunges',
  'Mountain Climbers',
];

const FormCheck = () => {
  const webcamRef = useRef<Webcam>(null);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleExerciseChange = (event: SelectChangeEvent) => {
    setSelectedExercise(event.target.value);
    setFeedback(null);
  };

  const startRecording = () => {
    setIsRecording(true);
    setFeedback(null);
    // In a real implementation, this would start the form analysis
    setTimeout(() => {
      stopRecording();
    }, 5000); // Record for 5 seconds
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Mock feedback - in a real implementation, this would come from AI analysis
    setFeedback(
      'Your form looks good! Keep your core tight and maintain a straight back throughout the movement.'
    );
  };

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: 'user',
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            mb: 2,
          }}
        >
          Form Check
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Get real-time feedback on your exercise form using AI-powered analysis
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 4,
          background: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
        }}
      >
        <Stack spacing={4}>
          <FormControl fullWidth>
            <InputLabel>Select Exercise</InputLabel>
            <Select
              value={selectedExercise}
              label="Select Exercise"
              onChange={handleExerciseChange}
              startAdornment={
                <FitnessCenterIcon 
                  sx={{ 
                    ml: 1, 
                    mr: 1,
                    color: 'primary.main',
                  }} 
                />
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              {exercises.map((exercise) => (
                <MenuItem key={exercise} value={exercise}>
                  {exercise}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper
            elevation={0}
            sx={{
              width: '100%',
              position: 'relative',
              backgroundColor: 'black',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {isRecording && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: 'error.main',
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(0.95)',
                      boxShadow: '0 0 0 0 rgba(255, 82, 82, 0.7)',
                    },
                    '70%': {
                      transform: 'scale(1)',
                      boxShadow: '0 0 0 10px rgba(255, 82, 82, 0)',
                    },
                    '100%': {
                      transform: 'scale(0.95)',
                      boxShadow: '0 0 0 0 rgba(255, 82, 82, 0)',
                    },
                  },
                }}
              />
            )}
          </Paper>

          <Button
            variant="contained"
            color={isRecording ? 'error' : 'primary'}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!selectedExercise}
            size="large"
            startIcon={<CameraIcon />}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            {isRecording ? 'Stop Recording' : 'Start Form Check'}
          </Button>

          {feedback && (
            <Alert 
              severity="success" 
              icon={<CheckCircleIcon fontSize="large" />}
              sx={{ 
                borderRadius: 2,
                '& .MuiAlert-message': {
                  fontSize: '1rem',
                },
              }}
            >
              {feedback}
            </Alert>
          )}
        </Stack>
      </Paper>

      <Paper 
        elevation={0}
        sx={{ 
          p: 4,
          background: 'white',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <LightbulbIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            How to use Form Check
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                minWidth: '24px',
              }}
            >
              1.
            </Typography>
            <Typography variant="body1">
              Select the exercise you want to perform
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                minWidth: '24px',
              }}
            >
              2.
            </Typography>
            <Typography variant="body1">
              Position yourself so your full body is visible in the camera
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                minWidth: '24px',
              }}
            >
              3.
            </Typography>
            <Typography variant="body1">
              Click "Start Form Check" and perform the exercise
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                minWidth: '24px',
              }}
            >
              4.
            </Typography>
            <Typography variant="body1">
              Our AI will analyze your form and provide real-time feedback
            </Typography>
          </Box>
          <Alert 
            severity="info" 
            sx={{ 
              mt: 2,
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.info.main, 0.05),
            }}
          >
            Make sure you have good lighting and enough space to perform the exercise safely.
          </Alert>
        </Stack>
      </Paper>
    </Container>
  );
};

export default FormCheck; 