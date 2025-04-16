import React, { useState, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
}

const availableExercises = [
  'Push-ups',
  'Squats',
  'Planks',
  'Lunges',
  'Mountain Climbers',
  'Burpees',
  'Jumping Jacks',
  'Crunches',
];

const steps = ['Select Goal', 'Choose Exercises', 'Review & Save'];

const WorkoutBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [workoutGoal, setWorkoutGoal] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('10');
  const [restTime, setRestTime] = useState('60');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddExercise = () => {
    if (currentExercise) {
      setSelectedExercises([
        ...selectedExercises,
        {
          name: currentExercise,
          sets: parseInt(sets),
          reps: parseInt(reps),
          restTime: parseInt(restTime),
        },
      ]);
      setCurrentExercise('');
    }
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Workout Goal</InputLabel>
            <Select
              value={workoutGoal}
              label="Workout Goal"
              onChange={(e: SelectChangeEvent) => setWorkoutGoal(e.target.value)}
            >
              <MenuItem value="strength">Build Strength</MenuItem>
              <MenuItem value="endurance">Improve Endurance</MenuItem>
              <MenuItem value="flexibility">Enhance Flexibility</MenuItem>
              <MenuItem value="general">General Fitness</MenuItem>
            </Select>
          </FormControl>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Exercise</InputLabel>
                <Select
                  value={currentExercise}
                  label="Exercise"
                  onChange={(e: SelectChangeEvent) => setCurrentExercise(e.target.value)}
                >
                  {availableExercises.map((exercise) => (
                    <MenuItem key={exercise} value={exercise}>
                      {exercise}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="Sets"
                  type="number"
                  value={sets}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSets(e.target.value)}
                  sx={{ width: '30%' }}
                />
                <TextField
                  label="Reps"
                  type="number"
                  value={reps}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setReps(e.target.value)}
                  sx={{ width: '30%' }}
                />
                <TextField
                  label="Rest (seconds)"
                  type="number"
                  value={restTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRestTime(e.target.value)}
                  sx={{ width: '40%' }}
                />
              </Stack>

              <Button
                variant="contained"
                onClick={handleAddExercise}
                disabled={!currentExercise}
              >
                Add Exercise
              </Button>

              <List>
                {selectedExercises.map((exercise, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={exercise.name}
                      secondary={`${exercise.sets} sets × ${exercise.reps} reps, ${exercise.restTime}s rest`}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Workout Summary
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Goal: {workoutGoal.charAt(0).toUpperCase() + workoutGoal.slice(1)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Exercises:
              </Typography>
              <List>
                {selectedExercises.map((exercise, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={exercise.name}
                      secondary={`${exercise.sets} sets × ${exercise.reps} reps, ${exercise.restTime}s rest`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Workout Builder
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Create your personalized workout routine
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {getStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !workoutGoal) ||
            (activeStep === 1 && selectedExercises.length === 0)
          }
        >
          {activeStep === steps.length - 1 ? 'Save Workout' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default WorkoutBuilder; 