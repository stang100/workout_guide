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
} from '@mui/material';
import Webcam from 'react-webcam';

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Form Check
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Get real-time feedback on your exercise form
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Select Exercise</InputLabel>
            <Select
              value={selectedExercise}
              label="Select Exercise"
              onChange={handleExerciseChange}
            >
              {exercises.map((exercise) => (
                <MenuItem key={exercise} value={exercise}>
                  {exercise}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              width: '100%',
              position: 'relative',
              backgroundColor: 'black',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', height: 'auto' }}
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
          </Box>

          <Button
            variant="contained"
            color={isRecording ? 'error' : 'primary'}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!selectedExercise}
            size="large"
          >
            {isRecording ? 'Stop Recording' : 'Start Form Check'}
          </Button>

          {feedback && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {feedback}
            </Alert>
          )}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          How to use Form Check
        </Typography>
        <Typography variant="body1" paragraph>
          1. Select the exercise you want to perform
        </Typography>
        <Typography variant="body1" paragraph>
          2. Position yourself so your full body is visible in the camera
        </Typography>
        <Typography variant="body1" paragraph>
          3. Click "Start Form Check" and perform the exercise
        </Typography>
        <Typography variant="body1" paragraph>
          4. Our AI will analyze your form and provide real-time feedback
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Note: Make sure you have good lighting and enough space to perform the exercise safely.
        </Typography>
      </Paper>
    </Container>
  );
};

export default FormCheck; 