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
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  SelectChangeEvent,
  alpha,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface SavedWorkout {
  id: string;
  name: string;
  goal: string;
  exercises: WorkoutExercise[];
  createdAt: string;
}

const availableExercises = [
  { name: 'Push-ups', difficulty: 'Beginner' },
  { name: 'Squats', difficulty: 'Beginner' },
  { name: 'Planks', difficulty: 'Beginner' },
  { name: 'Lunges', difficulty: 'Intermediate' },
  { name: 'Pull-ups', difficulty: 'Advanced' },
  { name: 'Dips', difficulty: 'Intermediate' },
  { name: 'Burpees', difficulty: 'Advanced' },
  { name: 'Mountain Climbers', difficulty: 'Intermediate' },
];

const steps = ['Select Goal', 'Choose Exercises', 'Review Workout'];

const WorkoutBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [workoutGoal, setWorkoutGoal] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<SavedWorkout | null>(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAddExercise = () => {
    setSelectedExercises([
      ...selectedExercises,
      {
        id: Date.now().toString(),
        name: '',
        sets: 3,
        reps: 10,
        restTime: 60,
        difficulty: 'Beginner',
      },
    ]);
  };

  const handleRemoveExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((exercise) => exercise.id !== id));
  };

  const handleExerciseChange = (id: string, field: keyof WorkoutExercise, value: any) => {
    setSelectedExercises(
      selectedExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSaveWorkout = () => {
    if (workoutName && workoutGoal && selectedExercises.length > 0) {
      const newWorkout: SavedWorkout = {
        id: Date.now().toString(),
        name: workoutName,
        goal: workoutGoal,
        exercises: selectedExercises,
        createdAt: new Date().toISOString(),
      };
      setSavedWorkouts([...savedWorkouts, newWorkout]);
      setOpenSaveDialog(false);
      setWorkoutName('');
    }
  };

  const handleLoadWorkout = (workout: SavedWorkout) => {
    setSelectedWorkout(workout);
    setWorkoutGoal(workout.goal);
    setSelectedExercises(workout.exercises);
    setActiveStep(2); // Jump to review step
  };

  const handleDeleteWorkout = (id: string) => {
    setSavedWorkouts(savedWorkouts.filter(workout => workout.id !== id));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Workout Goal</InputLabel>
              <Select
                value={workoutGoal}
                label="Workout Goal"
                onChange={(e) => setWorkoutGoal(e.target.value)}
              >
                <MenuItem value="strength">Strength</MenuItem>
                <MenuItem value="endurance">Endurance</MenuItem>
                <MenuItem value="hypertrophy">Hypertrophy</MenuItem>
                <MenuItem value="fat-loss">Fat Loss</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleAddExercise}
              sx={{ mb: 2 }}
            >
              Add Exercise
            </Button>
            <List>
              {selectedExercises.map((exercise) => (
                <ListItem
                  key={exercise.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    background: (theme) => alpha(theme.palette.primary.light, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <FormControl fullWidth>
                      <InputLabel>Exercise</InputLabel>
                      <Select
                        value={exercise.name}
                        label="Exercise"
                        onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                      >
                        {availableExercises.map((ex) => (
                          <MenuItem key={ex.name} value={ex.name}>
                            {ex.name} ({ex.difficulty})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        value={exercise.difficulty}
                        label="Difficulty"
                        onChange={(e) => handleExerciseChange(exercise.id, 'difficulty', e.target.value)}
                      >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                      </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        label="Sets"
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value))}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Reps"
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(exercise.id, 'reps', parseInt(e.target.value))}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Rest (sec)"
                        type="number"
                        value={exercise.restTime}
                        onChange={(e) => handleExerciseChange(exercise.id, 'restTime', parseInt(e.target.value))}
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                    <IconButton
                      onClick={() => handleRemoveExercise(exercise.id)}
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Paper
              sx={{
                p: 3,
                background: (theme) => alpha(theme.palette.primary.light, 0.1),
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Workout Summary
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Goal: {workoutGoal}
              </Typography>
              <List>
                {selectedExercises.map((exercise) => (
                  <ListItem key={exercise.id}>
                    <ListItemText
                      primary={exercise.name}
                      secondary={
                        <Stack direction="row" spacing={2}>
                          <Typography variant="body2" color="text.secondary">
                            {exercise.sets} sets × {exercise.reps} reps
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {exercise.restTime}s rest
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color={
                              exercise.difficulty === 'Beginner' ? 'success.main' :
                              exercise.difficulty === 'Intermediate' ? 'warning.main' :
                              'error.main'
                            }
                          >
                            {exercise.difficulty}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Workout Builder
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Create your custom workout routine
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              background: (theme) => alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
            }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {getStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => setOpenSaveDialog(true)}
                    startIcon={<SaveIcon />}
                  >
                    Save Workout
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !workoutGoal) ||
                      (activeStep === 1 && selectedExercises.length === 0)
                    }
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3,
              background: (theme) => alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Saved Workouts
            </Typography>
            {savedWorkouts.length === 0 ? (
              <Typography color="text.secondary">
                No saved workouts yet
              </Typography>
            ) : (
              <List>
                {savedWorkouts.map((workout) => (
                  <Card 
                    key={workout.id}
                    sx={{ 
                      mb: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {workout.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Goal: {workout.goal}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workout.exercises.length} exercises
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleLoadWorkout(workout)}
                      >
                        Load
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteWorkout(workout.id)}
                        sx={{ 
                          color: 'error.main',
                          '&:hover': {
                            backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogTitle>Save Workout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workout Name"
            fullWidth
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSaveDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveWorkout}
            variant="contained"
            disabled={!workoutName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WorkoutBuilder; 