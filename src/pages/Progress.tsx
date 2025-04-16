import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      aria-labelledby={`progress-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface WorkoutHistory {
  date: string;
  workout: string;
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
  }[];
}

const mockWorkoutHistory: WorkoutHistory[] = [
  {
    date: '2024-04-15',
    workout: 'Full Body Strength',
    duration: 45,
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 12 },
      { name: 'Squats', sets: 4, reps: 15 },
      { name: 'Planks', sets: 3, reps: 60 },
    ],
  },
  {
    date: '2024-04-13',
    workout: 'Core Focus',
    duration: 30,
    exercises: [
      { name: 'Crunches', sets: 3, reps: 20 },
      { name: 'Planks', sets: 4, reps: 45 },
      { name: 'Mountain Climbers', sets: 3, reps: 30 },
    ],
  },
];

const Progress = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const calculateProgress = () => {
    // Mock progress calculations
    return {
      workoutsCompleted: 8,
      totalMinutes: 280,
      streakDays: 3,
      monthlyGoal: 12,
    };
  };

  const progress = calculateProgress();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" align="center" gutterBottom>
        Your Progress
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Track your fitness journey and celebrate your achievements
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Workouts Completed
              </Typography>
              <Typography variant="h4">
                {progress.workoutsCompleted}/{progress.monthlyGoal}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(progress.workoutsCompleted / progress.monthlyGoal) * 100}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Minutes
              </Typography>
              <Typography variant="h4">{progress.totalMinutes}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Current Streak
              </Typography>
              <Typography variant="h4">{progress.streakDays} days</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Monthly Goal
              </Typography>
              <Typography variant="h4">{progress.monthlyGoal} workouts</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Workout History" />
          <Tab label="Achievements" />
          <Tab label="Statistics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <List>
            {mockWorkoutHistory.map((workout, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        {workout.workout} - {workout.date}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {workout.duration} minutes
                        </Typography>
                        {workout.exercises.map((exercise, i) => (
                          <Typography key={i} variant="body2" color="text.secondary">
                            • {exercise.name}: {exercise.sets} sets × {exercise.reps}{' '}
                            {exercise.name === 'Planks' ? 'seconds' : 'reps'}
                          </Typography>
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
                {index < mockWorkoutHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    First Workout
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed your first workout session
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    3-Day Streak
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Worked out for 3 consecutive days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Form Master
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Achieved perfect form in 5 different exercises
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" paragraph>
            Coming soon! Detailed statistics about your workout performance and progress.
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Progress; 