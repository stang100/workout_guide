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
  alpha,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FlagIcon from '@mui/icons-material/Flag';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveLine } from '@nivo/line';
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

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

interface WorkoutData {
  date: string;
  duration: number;
  calories: number;
  exercises: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Mock data for demonstration
const generateMockData = () => {
  const data: WorkoutData[] = [];
  const startDate = subMonths(new Date(), 6);
  const endDate = new Date();

  eachDayOfInterval({ start: startDate, end: endDate }).forEach((date) => {
    if (Math.random() > 0.7) { // 30% chance of workout
      data.push({
        date: format(date, 'yyyy-MM-dd'),
        duration: Math.floor(Math.random() * 60) + 30,
        calories: Math.floor(Math.random() * 500) + 200,
        exercises: Math.floor(Math.random() * 8) + 3,
        difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)] as 'Beginner' | 'Intermediate' | 'Advanced',
      });
    }
  });

  return data;
};

const workoutData = generateMockData();

const Progress = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('3m');
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setActiveTab(newValue);
  };

  const calculateProgress = () => {
    return {
      workoutsCompleted: 8,
      totalMinutes: 280,
      streakDays: 3,
      monthlyGoal: 12,
    };
  };

  const progress = calculateProgress();

  const statCards = [
    {
      title: 'Workouts Completed',
      value: `${progress.workoutsCompleted}/${progress.monthlyGoal}`,
      icon: <FitnessCenterIcon sx={{ color: 'primary.main', fontSize: 40 }} />,
      progress: (progress.workoutsCompleted / progress.monthlyGoal) * 100,
    },
    {
      title: 'Total Minutes',
      value: progress.totalMinutes,
      icon: <TimerIcon sx={{ color: 'secondary.main', fontSize: 40 }} />,
    },
    {
      title: 'Current Streak',
      value: `${progress.streakDays} days`,
      icon: <LocalFireDepartmentIcon sx={{ color: 'error.main', fontSize: 40 }} />,
    },
    {
      title: 'Monthly Goal',
      value: `${progress.monthlyGoal} workouts`,
      icon: <FlagIcon sx={{ color: 'info.main', fontSize: 40 }} />,
    },
  ];

  const getCalendarData = () => {
    return workoutData.map(workout => ({
      day: workout.date,
      value: workout.duration,
    }));
  };

  const getLineData = () => {
    const dataByWeek: { [key: string]: WorkoutData[] } = {};
    
    workoutData.forEach(workout => {
      const week = format(new Date(workout.date), 'yyyy-MM-dd');
      if (!dataByWeek[week]) {
        dataByWeek[week] = [];
      }
      dataByWeek[week].push(workout);
    });

    return [
      {
        id: 'Duration',
        data: Object.entries(dataByWeek).map(([week, workouts]) => ({
          x: week,
          y: workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length,
        })),
      },
      {
        id: 'Exercises',
        data: Object.entries(dataByWeek).map(([week, workouts]) => ({
          x: week,
          y: workouts.reduce((sum, w) => sum + w.exercises, 0) / workouts.length,
        })),
      },
    ];
  };

  const getStatistics = () => {
    const lastMonthData = workoutData.filter(
      w => new Date(w.date) >= startOfMonth(subMonths(new Date(), 1))
    );

    return {
      totalWorkouts: lastMonthData.length,
      avgDuration: Math.round(lastMonthData.reduce((sum, w) => sum + w.duration, 0) / lastMonthData.length),
      totalCalories: lastMonthData.reduce((sum, w) => sum + w.calories, 0),
      difficultyDistribution: {
        Beginner: lastMonthData.filter(w => w.difficulty === 'Beginner').length,
        Intermediate: lastMonthData.filter(w => w.difficulty === 'Intermediate').length,
        Advanced: lastMonthData.filter(w => w.difficulty === 'Advanced').length,
      },
    };
  };

  const stats = getStatistics();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
          Your Progress
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Track your fitness journey and celebrate your achievements
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  '& .MuiSvgIcon-root': {
                    mr: 2,
                  }
                }}>
                  {card.icon}
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                  >
                    {card.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {card.value}
                </Typography>
                {card.progress !== undefined && (
                  <LinearProgress
                    variant="determinate"
                    value={card.progress}
                    sx={{ 
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="1m">Last Month</MenuItem>
            <MenuItem value="3m">Last 3 Months</MenuItem>
            <MenuItem value="6m">Last 6 Months</MenuItem>
            <MenuItem value="1y">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: (theme) => alpha(theme.palette.primary.light, 0.1),
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Workouts
              </Typography>
              <Typography variant="h3" color="primary">
                {stats.totalWorkouts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: (theme) => alpha(theme.palette.success.light, 0.1),
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Duration
              </Typography>
              <Typography variant="h3" color="success.main">
                {stats.avgDuration} min
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: (theme) => alpha(theme.palette.warning.light, 0.1),
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calories Burned
              </Typography>
              <Typography variant="h3" color="warning.main">
                {stats.totalCalories}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card 
            sx={{ 
              height: '100%',
              background: (theme) => alpha(theme.palette.info.light, 0.1),
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Difficulty Distribution
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip 
                  label={`${stats.difficultyDistribution.Beginner}B`} 
                  color="success" 
                  size="small" 
                />
                <Chip 
                  label={`${stats.difficultyDistribution.Intermediate}I`} 
                  color="warning" 
                  size="small" 
                />
                <Chip 
                  label={`${stats.difficultyDistribution.Advanced}A`} 
                  color="error" 
                  size="small" 
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        sx={{ 
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              minWidth: 0,
              px: 3,
            },
          }}
        >
          <Tab label="Workout History" />
          <Tab label="Achievements" />
          <Tab label="Statistics" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <List>
            {mockWorkoutHistory.map((workout, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    background: (theme) => alpha(theme.palette.primary.main, 0.05),
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        {workout.workout} - {workout.date}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Duration: {workout.duration} minutes
                        </Typography>
                        {workout.exercises.map((exercise, i) => (
                          <Typography 
                            key={i} 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              mb: 0.5,
                            }}
                          >
                            <Box 
                              component="span" 
                              sx={{ 
                                width: 6, 
                                height: 6, 
                                background: 'primary.main',
                                borderRadius: '50%',
                                mr: 1,
                              }}
                            />
                            {exercise.name}: {exercise.sets} sets × {exercise.reps}{' '}
                            {exercise.name === 'Planks' ? 'seconds' : 'reps'}
                          </Typography>
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
                {index < mockWorkoutHistory.length - 1 && (
                  <Divider sx={{ my: 2, opacity: 0.1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  >
                    First Workout
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed your first workout session
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: 'secondary.main',
                      fontWeight: 600,
                    }}
                  >
                    3-Day Streak
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Worked out for 3 consecutive days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      color: 'error.main',
                      fontWeight: 600,
                    }}
                  >
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

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            background: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
          }}>
            <Typography 
              variant="h6" 
              color="primary"
              sx={{ mb: 2 }}
            >
              Coming Soon!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed statistics about your workout performance and progress.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>

      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          background: (theme) => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ mb: 3 }}
        >
          <Tab label="Calendar View" />
          <Tab label="Progress Charts" />
          <Tab label="Workout History" />
        </Tabs>

        {activeTab === 0 && (
          <Box sx={{ height: 400 }}>
            <ResponsiveCalendar
              data={getCalendarData()}
              from={subMonths(new Date(), 3).toISOString()}
              to={new Date().toISOString()}
              emptyColor="#eeeeee"
              colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
                }
              ]}
            />
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ height: 400 }}>
            <ResponsiveLine
              data={getLineData()}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Week',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Value',
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Recent Workouts
            </Typography>
            <Grid container spacing={2}>
              {workoutData.slice(-5).map((workout, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="subtitle1">
                          {format(new Date(workout.date), 'MMMM d, yyyy')}
                        </Typography>
                        <Chip 
                          label={workout.difficulty} 
                          color={
                            workout.difficulty === 'Beginner' ? 'success' :
                            workout.difficulty === 'Intermediate' ? 'warning' :
                            'error'
                          }
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {workout.duration} minutes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {workout.exercises} exercises
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {workout.calories} calories
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Progress; 